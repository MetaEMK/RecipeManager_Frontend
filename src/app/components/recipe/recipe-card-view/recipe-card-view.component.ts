import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-card-view',
  templateUrl: './recipe-card-view.component.html',
  styleUrls: ['./recipe-card-view.component.css']
})
export class RecipeCardViewComponent {

  @Input() 
  public recipes: Recipe[] = [];

  @Input()
  public editMode: boolean = false;

  @Output() add = new EventEmitter<number[]>();
  @Output() rmv = new EventEmitter<number[]>();

  public addRecipes: number[] = [];
  public rmvRecipes: number[] = [];

  constructor() { }

  public addRecipe(event: number) {
    if(this.addRecipes.includes(event)) {
      this.addRecipes.push(event);
    }
    this.add.emit(this.addRecipes);
  }

  public rmvRecipe(event: number) {
    if(this.rmvRecipes.includes(event)) {
      this.rmvRecipes.push(event);
    }
    this.add.emit(this.rmvRecipes);
  }
}
