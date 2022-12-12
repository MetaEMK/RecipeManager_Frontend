import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
import { Category } from 'src/app/model/category.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url_v1 = environment.api.baseUrl + '/v1/categories';

  private _categories: Category[] = [];
  public get categories(): Category[] {
    return this._categories;
  }

  constructor() { }

  public async getAllCategories(): Promise<Category[]>
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

  public async getCategoryById(id: number): Promise<Category>
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
      console.log("An error occured while trying to get category by id.");
      console.log(error);
      throw new ApiError(500, 'API_ERROR', 'API_CATEGORY_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }

  public async createCategory(name: string): Promise<Category>
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
}
