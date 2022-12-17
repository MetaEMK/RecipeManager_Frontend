import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { VariantService } from 'src/app/core/services/variant.service';
import { Ingredient } from 'src/app/model/ingredient.model';
import { Recipe } from 'src/app/model/recipe.model';
import { Variant } from 'src/app/model/variant.model';

@Component({
  selector: 'app-variant-details',
  templateUrl: './variant-details.component.html',
  styleUrls: ['./variant-details.component.css']
})
export class VariantDetailsComponent implements OnInit {

  public editMode: boolean = false;

  public variant?: Variant;
  public recipe?: Recipe;

  public multiplicator: number = 1;
  public ingredientMap?: Map<number, Ingredient[]> = new Map<number, Ingredient[]>();
  public finMap: boolean = false;
  public keys: number[] = [];


  constructor(
    private recipeService: RecipeService,
    private variantService: VariantService,
    private router: Router,
    private route: ActivatedRoute,
    private toastController: ToastController
    ) { }

  async ngOnInit(): Promise<void> {
    const recipeIdentifier = this.route.snapshot.paramMap.get('recipeIdentifier');
    const variantId = this.route.snapshot.paramMap.get('variantId');
;

    if(!recipeIdentifier || !variantId)
    {
      this.router.navigate(["/recipes"]);
      return;
    }

    if(!await this.getRecipe(recipeIdentifier))
      this.router.navigate(["/recipes"]);

    if(this.recipe && !Number.isNaN(+variantId))
      await this.getVariant(this.recipe.id, Number(variantId));
    else
      this.router.navigate(["/recipes", recipeIdentifier]);


    this.reorderIngredientMap();
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
      console.log(this.variant);
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
      console.log(this.ingredientMap);
    }
  }

  public async saveAllTest(): Promise<void> {
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
        const newVariant = await this.variantService.updateVariant(this.recipe.id, this.variant?.id, undefined, undefined, undefined, ingredients);
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
  public delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
