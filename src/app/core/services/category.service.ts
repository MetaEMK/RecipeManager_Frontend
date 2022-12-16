import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
import { Category } from 'src/app/model/category.model';
import { environment } from 'src/environment/environment';
import { GeneralService } from '../generalService';
import { Query } from '../query';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements GeneralService<Category> {
  private url_v1 = environment.api.baseUrl + '/categories';

  private _categories: Category[] = [];
  public get categories(): Category[] {
    return this._categories;
  }

  constructor() { }

  public async getAll(): Promise<Category[]>
  {
    try {
      const response = await fetch(this.url_v1);
      switch (response.status) {
        case 200:
          this._categories = (await response.json()).data;
          return this._categories;
        default:
          const error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      console.log("An error occured while trying to get all categories.");
      console.log(error);
      throw new ApiError(500, 'API_ERROR', 'API_CATEGORY_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }

  public async getByQuery(query: Query): Promise<Category[]> {
    let error: ApiError;
    try {
      let response = await fetch(this.url_v1 + query.toString());
      switch (response.status) {
        case 200:
          return (await response.json()).data;
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_CATEGORY_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }

  public async getById(id: number): Promise<Category>
  {
    try {
      const response = await fetch(this.url_v1 + '/' + id);
      switch (response.status) {
        case 200:
          return (await response.json()).data;
          
        default:
          const error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error) {
      if(error instanceof ApiError)
        throw error;
      throw new ApiError(500, 'API_ERROR', 'API_CATEGORY_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async getBySlug(slug: string): Promise<Category>
  {
    let error: ApiError;
    try {
      const response = await fetch(this.url_v1 + '/slug/' + slug);
      switch (response.status) {
        case 200:
          return (await response.json()).data;
          
        case 404:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Die Kategorie konnte nicht gefunden werden.", error);

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error) {
      if(error instanceof ApiError)
        throw error as ApiError;
      else
        throw new ApiError(500, 'API_ERROR', 'API_CATEGORY_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async create(name: string): Promise<Category>
  {
    let error: any;
    try {
      const response = await fetch(this.url_v1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      });
      switch (response.status) {
        case 201:
          const category = (await response.json()).data;
          this._categories.push(category);
          return category;

        case 409:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, 'Es existiert bereits eine Kategorie mit diesem Namen.', error);
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      if(error instanceof ApiError)
        throw error as ApiError;
      else
        throw new ApiError(500, 'API_ERROR', 'API_CATEGORY_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async update(id: number, addRecipes: number[], rmvRecipes: number[], name?: string,): Promise<Category>
  {
    let error: any;
    let bodyObj: any = {};
    
    if(name) bodyObj.name = name;

    let obj = {
      add: addRecipes,
      rmv: rmvRecipes
    };

    if (addRecipes.length > 0 || rmvRecipes.length > 0) bodyObj.recipe_ids = obj;

    console.log(bodyObj);
    try {
      const response = await fetch(this.url_v1 + '/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
      });
      
      switch (response.status) {
        case 200:
          return await this.getById(id);

        case 409:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, 'Es existiert bereits eine Kategorie mit diesem Namen.', error);
        
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      if(error instanceof ApiError)
        throw error as ApiError;
      else
        throw new ApiError(500, 'API_ERROR', 'API_CATEGORY_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async delete(id: number): Promise<void>
  {
    try {
      const response = await fetch(this.url_v1 + '/' + id, {
        method: 'DELETE'
      });
      switch (response.status) {
        case 204:
          await this.getAll();
          return;

        default:
          const error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      console.log("An error occured while trying to delete category.");
      console.log(error);
      throw new ApiError(500, 'API_ERROR', 'API_CATEGORY_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }
}
