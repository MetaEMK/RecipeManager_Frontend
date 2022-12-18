import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Query } from 'src/app/core/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';
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

  public recipes: Recipe[] = [];

  @Input()
  public searchQuery: Query = new Query();

  @Input()
  public editMode: boolean = false;

  @Output() add = new EventEmitter<number[]>();
  @Output() rmv = new EventEmitter<number[]>();


  public loading: boolean = false;
  private offset: number = 0;
  private limit: number = 10;

  public addRecipes: number[] = [];
  public rmvRecipes: number[] = [];


  public allowedItems: GeneralModelWithRouting[] = [];

  constructor(
    private recipeService: RecipeService,
  ) { }

  async ngOnChanges(event: any): Promise<void> {
    if(event.searchQuery && (!event.branch && !event.category))
    {
      this.recipes = [];
      this.searchQuery = event.searchQuery.currentValue;
      this.offset = 0;
      await this.searchByQuery();
    }
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

  public async searchByQuery(): Promise<void> {
    let query = new Query();
    query.addQueryItems(this.searchQuery.items);

    query.offset = this.offset;
    query.limit = this.limit;

    console.warn("fire query: " + query.toString())

    try {
      console.warn(query.toString())
      let newRecipes = await this.recipeService.getByQuery(query);
      this.recipes = this.recipes.concat(newRecipes);
    } catch (error) {
      console.error(error);
    }
    this.offset = this.offset + this.limit;

  }
  
  public async onInfinityScroll(event: any): Promise<void> 
  {
    await this.searchByQuery();
    event.target.complete();
  }

}
