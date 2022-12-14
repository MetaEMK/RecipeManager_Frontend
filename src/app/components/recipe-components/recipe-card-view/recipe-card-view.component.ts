import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { GeneralModel } from 'src/app/model/generalModel';
import { Recipe } from 'src/app/model/recipe.model';


export interface RecipeCardViewEvent {
  action: 'addToList' | 'removeFromList';
  id: number;
}
@Component({
  selector: 'app-recipe-card-view',
  templateUrl: './recipe-card-view.component.html',
  styleUrls: ['./recipe-card-view.component.css']
})
export class RecipeCardViewComponent implements OnChanges {

  @Input()
  public branch?: Branch;

  @Input()
  public category?: Category;

  @Input() 
  public recipes: Recipe[] = [];

  @Input()
  public editMode: boolean = false;

  @Output() add = new EventEmitter<number[]>();
  @Output() rmv = new EventEmitter<number[]>();


  public loading: boolean = false;

  public addRecipes: number[] = [];
  public rmvRecipes: number[] = [];

  public allowedItems: GeneralModel[] = [];

  constructor(
  ) { }

  async ngOnInit() {;
    if(this.branch) await this.getRecipesWithBranch();
    else if(this.category) await this.getRecipesWithCategory();
  }

  public async getRecipesWithCategory(): Promise<void> {
    this.loading = true;
    if(this.category?.id === undefined) return;

    try {
      //TODO: Get All Recipes which are not in the category yet
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  public async getRecipesWithBranch(): Promise<void> {
    this.loading = true;
    if(this.branch?.id === undefined) return;
    try {
        //TODO: Get All Recipes which are not in the branch yet
    }

    catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  ngOnChanges(event: any): void {
    if(event.editMode)
    {
      this.addRecipes = [];
      this.rmvRecipes = [];
      this.add.emit(this.addRecipes);
      this.rmv.emit(this.rmvRecipes);
    }
  }

  public addRecipeToAddList(event: any){
    this.addRecipes = event;
    this.add.emit(this.addRecipes);

  }

  public addRecipeToRemoveList(event: RecipeCardViewEvent){
    if(event.action === "addToList")
      this.rmvRecipes.push(event.id);
    else if(event.action === "removeFromList")
      this.rmvRecipes = this.rmvRecipes.filter((id) => id != event.id);

    this.rmv.emit(this.rmvRecipes);
  }
}
