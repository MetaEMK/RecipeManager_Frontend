import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Query, QueryItem } from 'src/app/core/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  public loading: boolean = false;
  public editMode: boolean = false;

  public recipe!: Recipe;
  public branches: Branch[] = [];
  public categories: Category[] = [];

  public query: Query = new Query();

  public newName?: string;
  public addCategories: GeneralModelWithRouting[] = [];
  public rmvCategories: GeneralModelWithRouting[] = [];
  public addBranches: GeneralModelWithRouting[] = [];
  public rmvBranches: GeneralModelWithRouting[] = [];

  constructor(
    private recipeService: RecipeService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    public settingsService: SettingsService,
    private toastControler: ToastController,
    public branchService: BranchService,
    public categoryService: CategoryService
    
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;

    const slug = this.route.snapshot.paramMap.get('slug');
    const editMode = this.route.snapshot.queryParamMap.get("editMode");

    if(!slug) 
    {
      this.loading = false;
      console.log("No slug provided");
      this.router.navigate(["/recipes"]);
      return;
    }

    try {
      this.recipe = await this.recipeService.getBySlug(slug);
      if(this.recipe?.id)
        this.branches = await this.branchService.getByQuery(new Query(new QueryItem("recipe", [this.recipe.id.toString()])));

      this.query.addQueryItem(new QueryItem("recipeExclude", [this.recipe.id.toString()]));
      this.loading = false;
    } catch (err) {
      console.error(err);
      let error = err as ApiError;
      this.toastControler.create({
        position: "top",
        message: error.messageForUser,
        duration: 3000,
        color: "danger"
      }).then((toast) => {
        toast.present();
      });
      this.loading = false;
      this.router.navigate(["/recipes"]);
    }
    if(editMode == "true")
      this.editMode = true;

      console.log(this.recipe);
      console.log(this.branches);
  }


  updateRecipe(): void {
    this.loading = true;
  }

  async deleteRecipe(): Promise<void> {
    this.loading = true;
  }
}
