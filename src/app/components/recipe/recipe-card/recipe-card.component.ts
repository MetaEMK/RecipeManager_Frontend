import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeCardViewEvent } from '../recipe-card-view/recipe-card-view.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnChanges {

  @Input() recipe?: Recipe;

  @Input() editMode : boolean = false;

  @Output() 
  public change = new EventEmitter<RecipeCardViewEvent>();

  public isRemoved: boolean = false;

  constructor(
    public themeService: ThemeService
  ) { }

  ngOnChanges(event?: any): void {
    if(event.editMode){
      this.isRemoved = false;
      this.setOpacity();
    }
  }

  public addRecipeToRemoveList(){
    if(this.recipe?.id == undefined) return;

    this.isRemoved = !this.isRemoved;
    this.setOpacity();

    let event: RecipeCardViewEvent;

    if(this.isRemoved)
      event = {action: "addToList", id: this.recipe.id};
    else
      event = {action: "removeFromList", id: this.recipe.id};
      
    this.change.emit(event);
  }

  public setOpacity(){
    let card = document.getElementById("recipeCardId" + this.recipe?.id);
    if(card){
      if(this.isRemoved)
        card.style.opacity = "0.2";
      else
        card.style.opacity = "1";
    }
  }
}
