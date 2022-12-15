import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Query, QueryItem } from 'src/app/core/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { Recipe } from 'src/app/model/recipe.model';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {

  public loading: boolean = false;

  public branch?: Branch;
  public selectedCategories: Category[] = [];
  public uncategorizedRecipes: Recipe[] = [];
  public uncategorizedChecked: boolean = false;


  public filteredRecipes: Recipe[] = [];
  public selectAll: boolean = false;

  //edit
  public editMode: boolean = false;
  public defaultQuery: Query = new Query();
  private lastQuery: Query = new Query();
  public newName: string|undefined;
  public addRecipes: number[] = [];
  public rmvRecipe: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService,
    private router: Router,
    public themeService: SettingsService,
    private toastController: ToastController,
    public recipeService: RecipeService
  ) { }

  ngOnInit()
  {
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug) {
      try {
        this.branchService.getBySlug(slug).then(async (branch) => {
          this.branch = branch;
          this.defaultQuery.add("branchExclude", branch.id.toString());
          await this.getBranch(branch.id);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
      } catch (error) {
        this.loading = false;
        console.log("An error occured while trying to get the branch by slug.");
        console.log(error);
      }
    }
    else
      this.router.navigate(["/branches"]);
  }

  public async getBranch(id: number)
  {
    this.loading = true;
    try {
      this.uncategorizedRecipes = [];
      this.branch = await this.branchService.getById(id);
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  public async searchByQuery($event: Query)
  {
    if($event.items.length === 0 ) {
      this.filteredRecipes = [];
    }
    else {
      this.loading = true;
      this.lastQuery = $event;
      if(this.branch?.id) $event.addFilter("branch", [this.branch.id.toString()]);
      this.filteredRecipes = [];
      this.recipeService.getByQuery($event).then((recipes) => {
        this.loading = false;
        this.filteredRecipes = recipes;
      }).
      catch((error) => {
        this.loading = false;
        console.error(error);
      });
    }
  }

  public async updateBranch()
  {
    this.loading = true;
    if(this.branch)
    {
      let toast;
      if(!this.newName && this.addRecipes.length === 0 && this.rmvRecipe.length === 0) {
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
          await this.branchService.update(this.branch.id, this.addRecipes, this.rmvRecipe, this.newName);
          this.router.navigate(["/branches/" + this.branch.slug]);
          this.editMode = false;
          toast = await this.toastController.create({
            message: "Abteilung wurde erfolgreich geändert",
            duration: 3000,
            position: "top",
            color: "success"  
          });
          this.changeEditMode();
          await this.getBranch(this.branch.id);
          await this.searchByQuery(this.lastQuery);
        } catch (error) {
          console.log(error);
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

  public async deleteBranch()
  {
    this.loading = true;
    if(this.branch)
    {
      let toast;
      this.editMode = false;
      try {
        await this.branchService.delete(this.branch.id);
        this.router.navigate(["/branches"]);
        toast = await this.toastController.create({
          message: "Abteilung wurde erfolgreich gelöscht",
          duration: 3000,
          position: "top",
          color: "success"
        });
      } catch (error) {
        console.log(error);
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
      this.rmvRecipe = [];
    }
  }
}
