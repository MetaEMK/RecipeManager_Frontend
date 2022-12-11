import { Component, Input, OnInit } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-card-add',
  templateUrl: './recipe-card-add.component.html',
  styleUrls: ['./recipe-card-add.component.css']
})
export class RecipeCardAddComponent implements OnInit {

  @Input() branch?: Branch;

  @Input() category?: Category;

  public recipes: Recipe[] = [];
  public filteredRecipes: Recipe[] = [];
  public loading = false;

  constructor(
    public themeService: ThemeService,
    public recipeService: RecipeService,
    public branchService: BranchService,
    public categoryService: CategoryService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getRecipes();

  }

  public async getRecipes(): Promise<void> {
    this.loading = true;
    try {
      this.recipes = await this.recipeService.getAllRecipes();
      console.log(this.recipes);
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  public filterForRecipes(event: any): void {
    const filterValue = event.target.value.toLowerCase();
    const pattern = ".*" + filterValue + ".*";
    this.filteredRecipes = this.recipes.filter(recipe => recipe.name.toLowerCase().match(pattern));
    
  }

}
