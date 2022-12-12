import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
import { Recipe } from 'src/app/model/recipe.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private url_v1 = environment.api.baseUrl + '/v1/recipes';


  private _recipes: Recipe[] = [];
  public get recipes(): Recipe[] {
    return this._recipes;
  }

  constructor() { }

  public async getAllRecipes(): Promise<Recipe[]>
  {
    console.log("Getting all recipes");
    try {
      const response = await fetch(this.url_v1);
      switch (response.status) {
        case 200:
          const test = (await response.json()).data;
          this._recipes = test;
          return this._recipes;
        default:
          const error = (await response.json()).error;
          console.log(error);
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      console.log("An error occured while trying to get all recipes.");
      console.log(error);
      throw new ApiError(500, 'API_ERROR', 'API_RECIPE_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }

}
