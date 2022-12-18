import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/category.service';
import { Query } from 'src/app/core/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Category } from 'src/app/model/category.model';
import { Recipe } from 'src/app/model/recipe.model';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css', '../../../../theme/theme.css']
})
export class CategoryDetailsComponent implements OnInit {

  public loading: boolean = false;
  public editMode: boolean = false;

  public category?: Category;
  public recipes: Recipe[] = []; 
  public filteredRecipes: Recipe[] = [];

  public defaultQuery: Query = new Query();
  public searchQuery: Query = new Query();
  private lastQuery: Query = new Query();

  public newName: string|undefined;
  public addRecipes: number[] = [];
  public rmvRecipes: number[] = [];

  constructor(
    private route: ActivatedRoute,
    public categoryService: CategoryService,
    private router: Router,
    private toastController: ToastController,
    public recipeService: RecipeService,
    private alertController: AlertController
  ) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {
      try {
        if(Number.isNaN(+slug))
          this.category = await this.categoryService.getBySlug(slug);
        else
          this.category = await this.categoryService.getById(Number(slug));

        this.configureQuery();

        this.loading = false;
      } 
      catch (error: any) {
        this.loading = false;

        if(error.code === 404)
          this.router.navigate(["home", '404']);
  
        else
        {
          let toast = await this.toastController.create({
            message: error.message,
            duration: 3000,
            position: "top",
            color: "danger"
          });

          await toast.present();
        }
      }
    }
    else {
      this.router.navigate(["home", '404']);
    }
  }

  public configureQuery() {
    if(this.category)
    {
      this.defaultQuery.add("categoryExclude", this.category.id.toString());
      this.searchQuery.add("category", this.category.id.toString());
    }
  }

  public async getCategory(id: number)
  {
    this.loading = true;
    try {
      this.category = undefined;
      const category = await this.categoryService.getById(id);
      this.category = category;
      this.configureQuery();
    } catch (error) {
    }
    this.loading = false;
  }

  public async searchByQuery(event: Query)
  {
    this.searchQuery = event;
    if(this.category)
      this.searchQuery.add("category", this.category.id.toString());
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
            this.router.navigate(["/categories/" + this.category.slug]);
            toast = await this.toastController.create({
              message: "Kategorie wurde erfolgreich geändert",
              duration: 3000,
              position: "top",
              color: "success"  
            });
            await this.getCategory(this.category.id);
            await this.searchByQuery(this.lastQuery);
            this.changeEditMode();
          } catch (error) {
            const err = error as ApiError;
            toast = await this.toastController.create({
              message: err.message + "\n" + "Es wurden keine Änderungen vorgenommen",
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
    const alert = await this.alertController.create({
      header: "Soll die Kategorie wirklich gelöscht werden?",
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
            const err = error as ApiError;
            toast = await this.toastController.create({
              message: err.message,
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
  
  public addItemsToAddList(event: GeneralModelWithRouting[])
  {
    this.addRecipes = [];
    event.forEach(element => {
      this.addRecipes.push(element.id);
    });
  }

  public changeEditMode()
  {
    this.editMode = !this.editMode;
    if(!this.editMode)
    {
      this.newName = undefined;
      this.addRecipes = [];
      this.rmvRecipes = [];
    }
  }
}
