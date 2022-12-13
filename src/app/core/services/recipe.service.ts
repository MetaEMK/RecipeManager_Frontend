import { Injectable, Type} from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
import { Recipe } from 'src/app/model/recipe.model';
import { environment } from 'src/environment/environment';
import { GeneralService } from './generalService';
import { Query } from './query';

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements GeneralService<Recipe> {
  
  public url_v1 = environment.api.baseUrl + '/v1/recipes';

  private _recipes: Recipe[] = [];
  public get recipes(): Recipe[] {
    return this._recipes;
  }

  constructor() { 
  }

  public async getAll(): Promise<Recipe[]>
  {
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
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_RECIPE_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async getById(id: number): Promise<Recipe>
  {
    let error: ApiError;
    try {
      const response = await fetch(this.url_v1 + '/' + id);
      switch (response.status) {
        case 200:
          return (await response.json()).data;

        case 404:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.errorCode, error.type, "Die angeforderte Rezept wurde nicht gefunden", error);
          
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.errorCode, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_RECIPE_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async getByQuery(query: Query): Promise<Recipe[]>
  {
    let error: ApiError;
    try {
      const response = await fetch(this.url_v1 + query);
      switch (response.status) {
        case 200:
          return (await response.json()).data;

        case 404:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.errorCode, error.type, "Die angeforderte Rezept wurde nicht gefunden", error);
          
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.errorCode, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_RECIPE_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }


  public async create(name: string, description?: string, img?: any): Promise<Recipe>
  {
    if(!description) description = "test";
    console.log(this.url_v1);

    let error: ApiError;
    try {
      const response = await fetch(this.url_v1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
        })
      });
      console.log(response.status);
      switch (response.status) {
        case 201:
          console.log("response");
          return (await response.json()).data;

        case 409:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.errorCode, error.type, "Ein Rezept mit diesem Namen existiert bereits", error);
          
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.errorCode, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_RECIPE_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async delete(id: number): Promise<void>
  {
    let error: ApiError;
    try 
    {
      const response = await fetch(this.url_v1 + '/' + id, {
        method: 'DELETE'
      });
      switch (response.status) {
        case 204:
          return;

        case 404:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.errorCode, error.type, "Die angeforderte Rezept wurde nicht gefunden", error);

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.errorCode, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);

      }
    } catch (error) 
    {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_RECIPE_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }
}
