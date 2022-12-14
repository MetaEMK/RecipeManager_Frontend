import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/category.service';
import { Query, QueryItem } from 'src/app/core/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Category } from 'src/app/model/category.model';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  public loading: boolean = false;
  public editMode: boolean = false;

  public category?: Category;
  public recipes: Recipe[] = []; 
  public filteredRecipes: Recipe[] = [];

  public defaultQuery: Query = new Query();

  public newName: string|undefined;
  public addRecipes: number[] = [];
  public rmvRecipes: number[] = [];

  constructor(
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    private router: Router,
    public settingsService: SettingsService,
    private toastController: ToastController,
    public recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {

      if(Number.isNaN(+slug) === true)
      {
          this.categoryService.getBySlug(slug).then((category) => {
          this.category = category;
          this.defaultQuery.add("categoryExclude", category.id.toString());
          this.defaultQuery.add("branchNone", "true");
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
      }
      else {
        try {
          this.categoryService.getById(Number(slug)).then((category) => {
            this.category = category;
            this.defaultQuery.add("branchNone", "true");
            this.defaultQuery.add("categoryExclude", category.id.toString());
            this.loading = false;
          })
        } catch (error) {
          console.error(error);
          this.loading = false;
        }
      }
    }
  }
  public async getCategory(id: number)
  {
    try {
      this.category = await this.categoryService.getById(id);
    } catch (error) {
      console.log(error);
    }
  }

  public async searchByQuery($event: Query)
  {
    if($event.items.length === 0 ) {
      this.filteredRecipes = [];
    }
    else {
      this.loading = true;
      if(this.category?.id) $event.addFilter("category", [this.category.id.toString()]);
      this.filteredRecipes = [];
      console.log("Query in category-edit: " + $event);
      this.recipeService.getByQuery($event).then((recipes) => {
        this.loading = false;
        this.filteredRecipes = recipes;
      }).catch((error) => {
          this.loading = false;
          console.error(error);
        });
    }
  }

  public async updateCategory() {
    {
      this.loading = true;
      if(this.category)
      {
        let toast;
        if(!this.newName && this.addRecipes.length === 0 && this.rmvRecipes.length === 0) {
          toast = await this.toastController.create({
            message: "Es wurden keine Änderungen vorgenommen",
            duration: 3000,
            position: "top",
          });
          this.editMode = false;
        }
        else
        {
          try {
            this.category = await this.categoryService.update(this.category.id, this.addRecipes, this.rmvRecipes, this.newName);
            this.recipes = this.category.recipes;
            this.editMode = false;
            this.router.navigate(["/categories/" + this.category.slug]);
            this.editMode = false;
            toast = await this.toastController.create({
              message: "Kategorie wurde erfolgreich geändert",
              duration: 3000,
              position: "top",
              color: "success"  
            });
          } catch (error) {
            console.log(error);
            const err = error as ApiError;
            toast = await this.toastController.create({
              message: err.messageForUser + "\n" + "Es wurden keine Änderungen vorgenommen",
              duration: 3000,
              position: "top",
              color: "danger"
            });
            this.editMode = true;
          }
        }
        await toast.present();
        this.loading = false;
      }
    }
  }

  public async deleteCategory()
  {
    this.loading = true;
    if(this.category)
    {
      let toast;
      this.editMode = false;
      try {
        await this.categoryService.delete(this.category.id);
        this.router.navigate(["/categories"]);
        toast = await this.toastController.create({
          message: "Kategorie wurde erfolgreich gelöscht",
          duration: 3000,
          position: "top",
          color: "success"
        });
      } catch (error) {
        console.log(error);
        const err = error as ApiError;
        toast = await this.toastController.create({
          message: err.messageForUser,
          duration: 3000,
          position: "top",
          color: "danger"
        });
      }
      await toast.present();
    }
    this.loading = false;
  }
  
}
