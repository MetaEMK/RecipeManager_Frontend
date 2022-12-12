import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ThemeService } from 'src/app/core/services/theme.service';
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


  public recipes: Recipe[] = [];
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
    private categoryService: CategoryService,
    private router: Router,
    public themeService: ThemeService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void
  {
    this.loading = true;
    const slug = this.route.snapshot.paramMap.get('slug');
    if(slug ) {
      try {
        this.branchService.getBranchBySlug(slug).then((branch) => {
          this.branch = branch;
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
    try {
      this.branch = await this.branchService.getBranchById(id);
    } catch (error) {
      console.log(error);
    }
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
    this.recipes = [];
    this.selectedCategories.forEach(async (category) => {
      this.loading = true;
      const cat = await this.categoryService.getCategoryById(category.id);
      cat.recipes.forEach(async (recipe) => {
        if(!this.recipes.find(r => r.id === recipe.id) && this.branch?.recipes.find(rec => rec.id === recipe.id))
        this.recipes.push(recipe);
      });
        this.loading = false;
    });
  }

  public async changeStateOfAll()
  {
    this.loading = true;
    console.log(this.newName);

    if(this.selectAll == true)
    {
      this.selectedCategories = [];
      this.recipes = [];
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
          await this.branchService.updateBranch(this.branch.id, this.addRecipe, this.rmvRecipe, this.newName);
          await this.getBranch(this.branch.id);
          this.editMode = false;
          this.router.navigate(["/branches/" + this.branch.slug]);
          this.editMode = false;
          toast = await this.toastController.create({
            message: "Abteilung wurde erfolgreich geändert",
            duration: 3000,
            position: "top"
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
        await this.branchService.deleteBranch(this.branch.id);
        this.router.navigate(["/branches"]);
        toast = await this.toastController.create({
          message: "Abteilung wurde erfolgreich gelöscht",
          duration: 3000,
          position: "top"
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
