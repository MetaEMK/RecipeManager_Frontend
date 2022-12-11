import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { Recipe } from 'src/app/model/recipe.model';


export interface FilteredRecipe {
  id: number;
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-recipe-card-add',
  templateUrl: './recipe-card-add.component.html',
  styleUrls: ['./recipe-card-add.component.css']
})
export class RecipeCardAddComponent implements OnInit {

  @Input() branch?: Branch;

  @Input() category?: Category;

  @Output() recipesIdsToAdd = new EventEmitter<number[]>();
  private idsToAdd: number[] = [];

  public recipes: FilteredRecipe[] = [];
  public filteredRecipes: FilteredRecipe[] = [];
  public loading = false;
  public isTriggered = true;

  constructor(
    public themeService: ThemeService,
    public recipeService: RecipeService,
    public branchService: BranchService,
    public categoryService: CategoryService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getRecipesWithBranch();

  }

  public async getRecipesWithBranch(): Promise<void> {
    this.loading = true;
    if(this.branch?.id === undefined) return;
    try {
      let recipeCategoryInBranch = (await this.branchService.getBranchById(this.branch.id)).recipes;
      let allRecipes = (await this.recipeService.getAllRecipes());

      allRecipes.forEach(recipe => {
        if(!recipeCategoryInBranch.find(rc => rc.id === recipe.id))
          this.recipes.push({id: recipe.id, name: recipe.name, checked: false});
      });

    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  public filterForRecipes(event: any): void {
    const filterValue = event.target.value.toLowerCase();
    const pattern = ".*" + filterValue + ".*";
    this.filteredRecipes = this.recipes.filter(recipe => recipe.name.toLowerCase().match(pattern));
    this.filteredRecipes.sort((a, b) => a.checked === b.checked ? 0 : a.checked ? -1 : 1);
  }

  public checkRecipe(recipe: FilteredRecipe){
    console.log(recipe);
    let rec = this.filteredRecipes.find(r => r.id === recipe.id);
    if(!rec) return;
    rec.checked = !rec.checked;

    if(rec.checked)
      this.idsToAdd.push(rec.id);
    else
      this.idsToAdd = this.idsToAdd.filter(id => id !== rec?.id);
      this.filteredRecipes.sort((a, b) => a.checked === b.checked ? 0 : a.checked ? -1 : 1);
      
      this.recipesIdsToAdd.emit(this.idsToAdd);
  
  }

}
