import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Query, QueryItem } from 'src/app/core/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';
import { Recipe, UpdateRecipe } from 'src/app/model/recipe.model';
import { VariantAddModalComponent } from 'src/app/components/variant-components/variant-add-modal/variant-add-modal.component';
import { VariantService } from 'src/app/core/services/variant.service';
import { Variant } from 'src/app/model/variant.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css', '../../../../theme/theme.css']
})
export class RecipeDetailsComponent implements OnInit {

  public loading: boolean = false;
  public editMode: boolean = false;

  public recipe!: Recipe;
  public branches: Branch[] = [];
  public categories: Category[] = [];

  public query?: Query;

  public newName?: string;
  public newDescription?: string|null|undefined;
  public addCategories: GeneralModelWithRouting[] = [];
  public rmvCategories: GeneralModelWithRouting[] = [];
  public addBranches: GeneralModelWithRouting[] = [];
  public rmvBranches: GeneralModelWithRouting[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private toastControler: ToastController,
    public branchService: BranchService,
    public categoryService: CategoryService,
    private modalcontroller: ModalController,
    private variantService: VariantService,
    private alertController: AlertController
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;

    const slug = this.route.snapshot.paramMap.get('recipeIdentifier');
    const editMode = this.route.snapshot.queryParamMap.get("editMode");
    
    if(!slug) 
    {
      this.loading = false;
      this.router.navigate(["home", '404']);
      return;
    }
    
    try {
      if(Number.isNaN(+slug))
        await this.getRecipeDetails(undefined, slug);
      else
        await this.getRecipeDetails(Number(slug));
      
    } catch (error: any) {
      console.log(error);
    }

    if(!this.recipe)
     this.router.navigate(["home", '404']);
    
    else
    {
      await this.getAllCategoriesForRecipe(this.recipe.id);
      await this.getAllBranchesForRecipe(this.recipe.id);
      await this.getAllVariantsForRecipe(this.recipe.id);
      
      this.query = new Query();
      this.query.add("recipeExclude", this.recipe?.id.toString());
      
      if(editMode)
      {
        await this.router.navigate(['/recipes', this.recipe.slug]);
        this.editMode = true;
  
      }
      
      this.loading = false;
    }
  }
  
  public async getRecipeDetails(id?: number, slug?: string)
  {
    let toast;
    try {
      if(id)
        this.recipe = await this.recipeService.getById(id);
      else if(slug)
        this.recipe = await this.recipeService.getBySlug(slug);
        
    } catch (error: any) {
      toast = await this.toastControler.create({
        position: "top",
        message: error.message,
        duration: 3000,
        color: "danger"
      });
    }
  }

  public async getAllVariantsForRecipe(id: number)
  {
    let toast;
    try {
      this.recipe.variants = await this.variantService.getVariantsForRecipe(id);
    } catch (error: any) {
      toast = await this.toastControler.create({
        position: "top",
        message: error.message,
        duration: 3000,
        color: "danger"
      });
    }
  }


  public async getAllCategoriesForRecipe(id: number)
  {
    try {
      this.categories = await this.categoryService.getByQuery(new Query(new QueryItem("recipe", [id.toString()])));
    } catch (error: any) {
      const toast = await this.toastControler.create({
        position: "top",
        message: error.message,
        duration: 3000,
        color: "danger"
      });
    }
  }

  public async getAllBranchesForRecipe(id: number)
  {
    let toast;
    try {
      this.branches = await this.branchService.getByQuery(new Query(new QueryItem("recipe", [id.toString()])));
    } catch (error: any) {
      toast = await this.toastControler.create({
        position: "top",
        message: error.message,
        duration: 3000,
        color: "danger"
      });
    }
  }

  public async imageChanges(event: any): Promise<void>
  {
    if(event) 
      this.recipe = await this.recipeService.getById(this.recipe.id);
  }

  async updateRecipe(): Promise<void> {
    this.loading = true;
    let updateBody: UpdateRecipe = {
      category_ids: {},
      branch_ids: {}
    };

    if(this.newName)
      updateBody.name = this.newName;

    if(this.newDescription !== "")
      updateBody.description = this.newDescription;
    else if(this.newDescription === '' || this.newDescription === null ) 
      updateBody.description = null;

    if(this.addCategories.length > 0)
      updateBody.category_ids.add = this.addCategories.map((category) => category.id);

    if(this.rmvCategories.length > 0)
      updateBody.category_ids.rmv = this.rmvCategories.map((category) => category.id);

    if(this.addBranches.length > 0)
      updateBody.branch_ids.add = this.addBranches.map((branch) => branch.id);

    if(this.rmvBranches.length > 0)
      updateBody.branch_ids.rmv = this.rmvBranches.map((branch) => branch.id);

    try
    {
      this.recipe = await this.recipeService.update(this.recipe.id, updateBody);
      
      this.loading = false;
      this.editMode = false;
  
      this.router.navigate(["/recipes", this.recipe.slug]);
      await this.ngOnInit();    
    }
    catch(error: any)
    {
      let toast = await this.toastControler.create({
        position: "top",
        message: error.message,
        duration: 3000,
        color: "danger"
      });

      await toast.present();
    }

    this.loading = false;

  }

  async deleteRecipe(): Promise<void> {
    const alert = await this.alertController.create({
      header: "Soll das Rezept wirklich gelöscht werden?",
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

    if (role === "confirm") {
      this.loading = true;
      let toast;
      try {
        await this.recipeService.delete(this.recipe.id);
        toast = await this.toastControler.create({
          position: "top",
          message: "Rezept gelöscht",
          duration: 3000,
          color: "success"
        });
        await toast.present();
        this.loading = false;
        this.router.navigate(["/recipes"]);
      }
  
      catch(error: any)
      {
        console.error(error);
        toast = await this.toastControler.create({
          position: "top",
          message: error.message,
          duration: 3000,
          color: "danger"
        });
        this.loading = false;
      }
    }
  }

  public async addVariant(): Promise<void> {
    let test = await this.modalcontroller.create({
      component: VariantAddModalComponent,
      componentProps: {
        recipeId: this.recipe.id
      }
    });
    
    test.present();

    test.onDidDismiss().then(async (data) => {
      if(data)
        await this.getAllVariantsForRecipe(this.recipe.id);
    });
  }

  public routeToVariant(variant: Variant): void {
    this.router.navigate(["/recipes", this.recipe.slug,  "variant", variant.id]);
  }

}
