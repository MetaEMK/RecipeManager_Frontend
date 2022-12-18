import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
import { Ingredient } from 'src/app/model/ingredient.model';
import { Size } from 'src/app/model/size.model';
import { Variant } from 'src/app/model/variant.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class VariantService {

  private url_v1 = environment.api.baseUrl + '/recipes';

  
  constructor() { }

  public async getVariantsForRecipe(recipeId: number): Promise<Variant[]> {
    let error: any;

    try {
      let response = await fetch(this.url_v1 + '/' + recipeId + '/variants');

      switch (response.status) {
        case 200:
          return (await response.json()).data;

        default:
          error = (await response.json()).error;
          throw new Error(error.message);
      }
    } catch (error: any) {
      if (error instanceof ApiError)
        throw error;

      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async getVariant(recipeId: number, variantId: number): Promise<Variant> {
    let error: any;

    try {
      let response = await fetch(this.url_v1 + '/' + recipeId + '/variants/' + variantId);

      switch (response.status) {
        case 200:
          return (await response.json()).data;

        default:
          error = (await response.json()).error;
          throw new Error(error.message);
      }
    } catch (error: any) {
      if (error instanceof ApiError)
        throw error;

      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async createVariant(recipeId: number, name: string, conversionTypeId: number,  sizeId: number, description?: string): Promise<Variant> {

    const bodyObj: any = {
      name: name,
      size: sizeId,
      conversionType: conversionTypeId
    };

    if (description) bodyObj.description = description;
    console.log(bodyObj);
    try {
      let response = await fetch(this.url_v1 + '/' + recipeId + '/variants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
      });

      let error: any;
      switch (response.status) {
        case 201:
          return (await response.json()).data;

        case 400:
          error = (await response.json()).error;
          throw ApiError.getBadRequestError(error);

        case 409:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es existiert bereits eine Rezeptvariante mit diesem Namen.", error);

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error: any) {
      if (error instanceof ApiError)
        throw error;

      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  //TODO: implement UpdateVariant
  public async updateVariant(recipeId: number, variantId: number, name?: string, description?: string|null, size?: Size, ingredients?: Ingredient[]): Promise<Variant> {
    let bodyObj: any = {};
    if(name) bodyObj.name = name;
    bodyObj.description = description;
    if(size) bodyObj.size = size.id;
    if(ingredients) bodyObj.ingredients = ingredients;
    
    try {
      let response = await fetch(this.url_v1 + '/' + recipeId + '/variants/' + variantId, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
      });

      let error: any;
      switch (response.status) {
        case 200:
          return (await response.json()).data;

        case 400:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, error.message, error);

        case 409:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es existiert bereits eine Rezeptvariante mit diesem Namen.", error);

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error: any) {
      if (error instanceof ApiError)
        throw error;

      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async deleteVariant(recipeId: number, variantId: number): Promise<void> {
    let error: any;

    try {
      let response = await fetch(this.url_v1 + '/' + recipeId + '/variants/' + variantId, {
        method: 'DELETE'
      });

      switch (response.status) {
        case 204:
          return;

        default:
          error = (await response.json()).error;
          throw new Error(error.message);
      }
    }
    catch (error: any) {
      if (error instanceof ApiError)
        throw error;

      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }
}
