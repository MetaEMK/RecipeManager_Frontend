import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { GeneralModel } from 'src/app/model/generalModel';
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
  public recipeFilterValue?: string;

  constructor(
    public themeService: SettingsService,
    public recipeService: RecipeService,
    public branchService: BranchService,
    public categoryService: CategoryService,
  ) { }

  async ngOnInit() {;
    if(this.branch) await this.getRecipesWithBranch();
    else if(this.category) await this.getRecipesWithCategory();
  }

  public async getRecipesWithCategory(): Promise<void> {
    this.loading = true;
    if(this.category?.id === undefined) return;
    try {
      let recipeCategory= (await this.categoryService.getById(this.category.id)).recipes;
      let allRecipes = (await this.recipeService.getAll());
      allRecipes.forEach(recipe => {
        if(!recipeCategory.find(rc => rc.id === recipe.id))
          this.recipes.push({id: recipe.id, name: recipe.name, checked: false});
      });
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  public async getRecipesWithBranch(): Promise<void> {
    this.loading = true;
    if(this.branch?.id === undefined) return;
    try {
      let recipeCategoryInBranch = (await this.branchService.getById(this.branch.id)).recipes;
      let allRecipes = (await this.recipeService.getAll());

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
    this.recipeFilterValue = event.target.value?.toLowerCase();
    const filterValue = this.recipeFilterValue
    const pattern = ".*" + filterValue + ".*";
    this.filteredRecipes = this.recipes.filter(recipe => recipe.name.toLowerCase().match(pattern));
    this.filteredRecipes.sort((a, b) => a.checked === b.checked ? 0 : a.checked ? -1 : 1);
  }

  public checkRecipe(recipe: FilteredRecipe){
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

  public setFocus(status: boolean){
    if(status){
      this.recipeFilterValue = "";
      this.setFilterToAll();
    }
    else{
      this.recipeFilterValue = undefined;
      this.setFilterToChecked();
    }
  }

  private setFilterToAll(){
    this.filteredRecipes = this.recipes;
  }

  private setFilterToChecked(){
    this.filteredRecipes = this.recipes.filter(recipe => recipe.checked);
  }

}
