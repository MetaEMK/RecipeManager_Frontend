import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SizeService } from 'src/app/core/services/size.service';
import { VariantService } from 'src/app/core/services/variant.service';
import { Ingredient } from 'src/app/model/ingredient.model';
import { Recipe } from 'src/app/model/recipe.model';
import { Size } from 'src/app/model/size.model';
import { Variant } from 'src/app/model/variant.model';

@Component({
  selector: 'app-variant-details',
  templateUrl: './variant-details.component.html',
  styleUrls: ['./variant-details.component.css', '../../../../../theme/theme.css']
})
export class VariantDetailsComponent implements OnInit {

  public editMode: boolean = false;

  public variant?: Variant;
  public recipe?: Recipe;

  public multiplicator: number = 1;
  public quantity: number = 1;
  public size?: Size;

  public ingredientMap?: Map<number, Ingredient[]> = new Map<number, Ingredient[]>();
  public finMap: boolean = false;
  public keys: number[] = [];

  public newName?: string;
  public newDescription?: string|null|undefined;
  public newSize?: Size;

  constructor(
    private recipeService: RecipeService,
    private variantService: VariantService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private sizeService: SizeService,
    public alertController: AlertController
    ) { }

  async ngOnInit(): Promise<void> {
    const recipeIdentifier = this.route.snapshot.paramMap.get('recipeIdentifier');
    const variantId = this.route.snapshot.paramMap.get('variantId');

    const queryParamMap = this.route.snapshot.queryParamMap;
    
    if(!recipeIdentifier || !variantId)
    {
      this.router.navigate(["home", '404']);
      return;
    }
    
    if(!await this.getRecipe(recipeIdentifier))
    this.router.navigate(["home", '404']);
    
    if(this.recipe && !Number.isNaN(+variantId))
      await this.getVariant(this.recipe.id, Number(variantId));
    else
      this.router.navigate(["home", '404']);
    
    
    await this.checkForQueryParams(queryParamMap);
    this.reorderIngredientMap();
  }

  private async checkForQueryParams(queryParamMap: ParamMap): Promise<void> {
    if(this.variant){
      if(queryParamMap.has('quantity'))
        this.quantity = Number(queryParamMap.get('quantity'));

      if(queryParamMap.has('sizeId'))
      {
        try {
          const conversionTypeId: number = this.variant?.conversionType.id;
          const sizes: Size[] = await this.sizeService.getAll(conversionTypeId);
          this.size = sizes.find(size => size.id == Number(queryParamMap.get('sizeId')));
        } catch (error: any) {
          console.warn(error);
        }
      }
    }
  }
  

  private async getRecipe(recipeIdentifier: string): Promise<boolean> {
    try {
      if(Number.isNaN(+recipeIdentifier))
        this.recipe = await this.recipeService.getBySlug(recipeIdentifier);
      else
        this.recipe = await this.recipeService.getById(Number(recipeIdentifier));
   
      if(!this.recipe)
        return false;
      else
        return true;

    } catch (error: any) {
      const toast = await this.toastController.create({
        position: 'top',
        color: 'danger',
        message: error.message,
        duration: 3000
      });

      await toast.present();
      return false;
    }
  }

  private async getVariant(recipeId: number, variantId: number): Promise<void> {
    try {
      this.variant = await this.variantService.getVariant(recipeId, variantId);
    } catch (error: any) {
      //TODO: Routernavigation back to recipe
      const toast = await this.toastController.create({
        position: 'top',
        color: 'danger',
        message: error.message,
        duration: 2000
      });

      await toast.present();
    }

  }
  private reorderIngredientMap(): void {
    if(!this.variant) return;

    this.ingredientMap = new Map<number, Ingredient[]>();
    
    this.variant.ingredients.forEach(ingredient => {
      if(!this.ingredientMap) return;
      if(this.ingredientMap.has(ingredient.section))
      {
        let ingredients = this.ingredientMap.get(ingredient.section);
        if(ingredients)
          ingredients.push(ingredient);
        else
          ingredients = [ingredient];

          this.ingredientMap.set(ingredient.section, ingredients);
      }
      else
      this.ingredientMap.set(ingredient.section, [ingredient]);
    });
    this.keys = Array.from(this.ingredientMap.keys());
    this.finMap = true;
  }

  public removeSection(section: number): void {
    if(this.ingredientMap)
    {
      this.ingredientMap.delete(section);
      this.keys = Array.from(this.ingredientMap.keys());
    }
  }

  public async changeEditMode(): Promise<void> {
    this.editMode = !this.editMode;
    if(this.recipe && this.variant && !this.editMode)
    {
      await this.getVariant(this.recipe.id, this.variant.id)
      this.reorderIngredientMap();
    }
  }

  public addSection(): void {
    if(this.ingredientMap)
    {
      this.ingredientMap = this.ingredientMap.set(this.ingredientMap.size + 1, []);
      this.keys = Array.from(this.ingredientMap.keys());
    }
  }


  public onChangeIngredientListOnSection(section: number, ingredients: Ingredient[]): void {
    if(this.ingredientMap)
    {
      this.ingredientMap?.set(section, ingredients);
    }
  }

  public async saveVariant(): Promise<void> {
    if(this.ingredientMap && this.recipe && this.variant)
    {
      let ingredients: Ingredient[] = [];
      this.ingredientMap.forEach(ingredientList => {
        ingredientList.forEach(ingredient => {
          ingredients.push(ingredient);
        });
      });

      let toast;
      try {
        if(this.newDescription == '') this.newDescription = null;
        const newVariant = await this.variantService.updateVariant(this.recipe.id, this.variant?.id, this.newName, this.newDescription, this.newSize, ingredients);
        toast = await this.toastController.create({
          position: 'top',
          color: 'success',
          message: 'Variante erfolgreich gespeichert',
          duration: 3000
        });
        this.editMode = false;
        this.variant = newVariant;
        this.reorderIngredientMap();
      } catch (error: any) {
        toast = await this.toastController.create({
          position: 'top',
          color: 'danger',
          message: error.message,
          duration: 3000
        });
      }
      await toast.present();
    }
  }

  public async deleteVariant(): Promise<void> {
    if(this.recipe && this.variant)
    {
      let toast;

      const alert = await this.alertController.create({
        header: "Soll die Variante wirklich gelöscht werden?",
        buttons: [
          {
            text: "Abbrechen",
            role: "cancel"
          },
          {
            text: "Ok",
            role: "confirm"
          }
        ]
      });

      
      await alert.present();
      
      const { role } = await alert.onDidDismiss();

      if(role === "confirm") 
      {
        try {
          await this.variantService.deleteVariant(this.recipe.id, this.variant.id);
          toast = await this.toastController.create({
            position: 'top',
            color: 'success',
            message: 'Variante erfolgreich gelöscht',
            duration: 3000
          });
          this.router.navigate(["/recipes", this.recipe.id]);
        } catch (error: any) {
          toast = await this.toastController.create({
            position: 'top',
            color: 'danger',
            message: error.message,
            duration: 3000
          });
        }
        await toast.present();
      }
    }
  }
}
