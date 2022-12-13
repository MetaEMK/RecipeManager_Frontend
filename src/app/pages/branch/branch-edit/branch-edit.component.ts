import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Query, QueryItem } from 'src/app/core/services/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { Recipe } from 'src/app/model/recipe.model';

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
  public get deletePossible(): boolean {return this.branch?.recipeCategories.length === 0 && this.editMode };
  public newName: string|undefined;
  public addRecipe: number[] = [];
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
    this.loading = true;
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug ) {
      try {
        this.branchService.getBySlug(slug).then(async (branch) => {
          this.branch = branch;
          await this.getBranch(branch.id);
        })
        .catch((error) => {
          console.log(error);
        });
      } catch (error) {
        console.log("An error occured while trying to get the branch by slug.")
        console.log(error);
      }
    }
    else
      this.router.navigate(["/branches"]);
    this.loading = false;
  }

  public async getBranch(id: number)
  {
    this.loading = true;
    try {
      this.uncategorizedRecipes = [];
      this.branch = await this.branchService.getById(id);
      this.branch.recipes.forEach((recipe) => {
        if(recipe.categories.length === 0) this.uncategorizedRecipes.push(recipe);
      });
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  public getState(category: Category): string
  {
    if(this.selectedCategories.includes(category))
      return "primary";
    else
      return this.themeService.opposittheme;
  }

  public async changeStateOf(category: Category)
  {
    this.loading = true;
    if(this.selectedCategories.find((c) => c.id === category.id))
    
    this.selectedCategories = this.selectedCategories.filter((c) => c.id !== category.id);
    else
    this.selectedCategories.push(category);
    
    this.changeStateOfRecipe();
    if(this.selectedCategories.length !== this.branch?.recipeCategories.length) this.selectAll=false;
    else this.selectAll=true;

    this.loading = false;
  }

  public async changeStateOfRecipe()
  {
    this.loading = true;
    let filRec: Recipe[] = [];
    for(let category of this.selectedCategories)
    {
      
      let query = new Query();
      query.addQueryItem(new QueryItem("category", category.id.toString()));
      if(this.branch?.id) query.addQueryItem(new QueryItem("branch", this.branch.id.toString()));
      
      let recipes = await this.recipeService.getByQuery(query);
      recipes.forEach((recipe) => {
        if(!filRec.find((r) => r.id === recipe.id))
          filRec.push(recipe);
      });
    }
    if(this.uncategorizedChecked)
    {
      filRec = filRec.concat(this.uncategorizedRecipes);
    }
    this.filteredRecipes = filRec;
    this.loading = false;
  }

  public async changeStateOfUncategorized()
  {
    this.loading = true;
    this.uncategorizedChecked = !this.uncategorizedChecked;
    this.changeStateOfRecipe();
    this.loading = false;
  }

  public async changeStateOfAll()
  {
    this.loading = true;
    console.log(this.newName);

    if(this.selectAll == true)
    {
      this.selectedCategories = [];
      this.filteredRecipes = [];
    }
    else
    {
      this.selectedCategories = this.branch?.recipeCategories || [];
    }

    this.selectAll = !this.selectAll;
    this.loading = false;
    this.changeStateOfRecipe();
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  public async updateBranch()
  {
    this.loading = true;
    if(this.branch)
    {
      let toast;
      if(!this.newName && this.addRecipe.length === 0 && this.rmvRecipe.length === 0) {
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
          await this.branchService.update(this.branch.id, this.addRecipe, this.rmvRecipe, this.newName);
          await this.getBranch(this.branch.id);
          this.editMode = false;
          this.router.navigate(["/branches/" + this.branch.slug]);
          this.editMode = false;
          toast = await this.toastController.create({
            message: "Abteilung wurde erfolgreich geändert",
            duration: 3000,
            position: "top",
            color: "success"  
          });
          await this.changeStateOfRecipe();
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
