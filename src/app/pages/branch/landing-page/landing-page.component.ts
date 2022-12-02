import { Component, OnInit } from '@angular/core';
import { ThemeServiceService } from 'src/app/core/services/theme-service.service';
import { Category, Recipe, categories, recipes } from 'src/test';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public categories: Category[] = [];

  public recipes: Recipe[] = [];

  public mode: string;
  public color: string;

  constructor(themeService: ThemeServiceService) {
    this.color = "dark"
    this.mode = themeService.mode;
  }

  public getColor(cat: Category)
  {
    if(cat.activated)
    {
      return "success";
    }
    else
    {
      return "dark";
    }
  }

  public toggleCategory(cat: Category)
  {
    cat.activated = !cat.activated;
  }

  ngOnInit(): void {
    Category.addDummyCategories();
    this.categories = categories;
    Recipe.addDummyRecipes();
    this.recipes = recipes;
  }




}