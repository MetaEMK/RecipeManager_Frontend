import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent implements OnInit {

  @Input() recipe?: Recipe;

  @Input() editMode : boolean = false;

  @Output() 
  public change = new EventEmitter<number>();



  constructor(
    public themeService: ThemeService
  ) { }

  ngOnInit(): void {
  }

}
