import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/category.service';
import { ThemeService } from 'src/app/core/services/theme.service';
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

  public newName: string|undefined;
  public addRecipes: number[] = [];
  public rmvRecipes: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    public themeService: ThemeService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {

      if(Number.isNaN(+slug) === true)
      {
        this.categoryService.getBySlug(slug).then((category) => {
          this.category = category;
          this.recipes = category.recipes;
          this.loading = false;
          console.log(category);
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
      }
      else {
        try {
          console.log(slug);
          console.log(Number(slug));
          this.categoryService.getById(Number(slug)).then((category) => {
            this.category = category;
            this.recipes = category.recipes;
            this.loading = false;
            console.log(category);
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
            await this.categoryService.update(this.category.id, this.addRecipes, this.rmvRecipes, this.newName);
            await this.getCategory(this.category.id);
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
