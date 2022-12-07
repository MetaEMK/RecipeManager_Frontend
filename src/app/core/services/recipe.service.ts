import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/models/apierror.model';
import { Recipe } from 'src/app/models/recipe.model';


const backend_url = "http://localhost:3000/api/v1";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private _recipes: Recipe[] = [];

  public get recipes()
  {
    return this._recipes;
  }
  
  constructor() { }

  public async getAllRecipes(): Promise<Recipe[]|ApiError> {
    try {
      let response = await fetch(backend_url + "/recipes");

      switch(response.status) {
        case 200:
          let recipes = await response.json();
          return recipes;;
        case 400:
          return new ApiError(400, "DUMMYFOR400", "HALLO ICH BIN EINE DUMMY NACHRICHT FÜR 400");
        default :
          console.log(response);
          return new ApiError(response.status, "UnknownError", "Ein unbekannter Fehler ist aufgetreten.");
      }
    } catch (error) {
      console.log(error);
      return new ApiError(500, "UnknownError", "Ein unbekannter Fehler ist aufgetreten.");
    }
  }
}
