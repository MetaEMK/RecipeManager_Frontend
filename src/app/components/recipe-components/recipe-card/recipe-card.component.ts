import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Recipe } from 'src/app/model/recipe.model';
import { RecipeCardViewEvent } from '../recipe-card-view/recipe-card-view.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnChanges, OnInit {

  @Input() recipe!: Recipe;

  @Input() editMode : boolean = false;

  @Output() 
  public change = new EventEmitter<RecipeCardViewEvent>();

  public isRemoved: boolean = false;

  public get imagePath(): string {
    if(!this.recipe.imagePath) return this.settingsService.recipeImagePlaceholderPath;
    else return this.recipe.imagePath;
  }

  constructor(
    public settingsService: SettingsService,
    private router: Router
  ) { }

  ngOnChanges(event: any) {
    if(event.editMode){
      this.isRemoved = false;
      this.setOpacity();
    }
  }

  ngOnInit(): void {
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

  public routeToRecipe(){
    if(this.recipe.slug && !this.editMode)
      this.router.navigate(['/recipes', this.recipe.slug]);
  }
}
