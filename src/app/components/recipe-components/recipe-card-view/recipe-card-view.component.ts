import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
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

  @Input() 
  public recipes: Recipe[] = [];

  @Input()
  public editMode: boolean = false;

  @Output() add = new EventEmitter<number[]>();
  @Output() rmv = new EventEmitter<number[]>();


  public loading: boolean = false;

  public addRecipes: number[] = [];
  public rmvRecipes: number[] = [];

  public defaultQuery: Query = new Query();

  public allowedItems: GeneralModelWithRouting[] = [];

  constructor(
  ) { }

  async ngOnInit() {;
    if(this.branch) this.getRecipesWithBranch();
    else if(this.category) this.getRecipesWithCategory();
  }

  public getRecipesWithCategory(): void {
    if(this.category?.id === undefined) return;
    this.defaultQuery.add("categoryExclude", this.category.id.toString());
  }

  public async getRecipesWithBranch(): Promise<void> {
    this.loading = true;
    if(this.branch?.id === undefined) return;
    this.defaultQuery.add("branchExclude", this.branch.id.toString());
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
