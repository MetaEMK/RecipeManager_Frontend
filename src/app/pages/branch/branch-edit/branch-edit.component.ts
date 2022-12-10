import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.css']
})
export class BranchEditComponent implements OnInit {

  public branch?: Branch;
  public categories: Category[] = [];
  public selectedCategories: Category[] = [];
  public recipes: Recipe[] = [];
  public selectAll: boolean = false;



  //edit
  public editName: boolean = false;
  public nameNewValue?: string;

  constructor(
    private route: ActivatedRoute,
    private branchService: BranchService,
    private categoryService: CategoryService,
    private router: Router,
    public themeService: ThemeService
  ) { }

  ngOnInit(): void
  {
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
    
    if(this.selectedCategories.find((c) => c.id === category.id))
    this.selectedCategories = this.selectedCategories.filter((c) => c.id !== category.id);
    else
    this.selectedCategories.push(category);
    
    this.changeStateOfRecipe();
    if(this.selectedCategories.length !== this.branch?.recipeCategories.length) this.selectAll=false;
    else this.selectAll=true;
  }

  public changeStateOfRecipe()
  {
    this.recipes = [];
    this.selectedCategories.forEach(async (category) => {
      const cat = await this.categoryService.getCategoryById(category.id);
      console.log(cat);
      cat.recipes.forEach((recipe) => {
        if(!this.recipes.find(r => r.id === recipe.id))
          this.recipes.push(recipe);
      });
    });
  }

  public async changeStateOfAll()
  {
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
    this.changeStateOfRecipe();
  }
}
