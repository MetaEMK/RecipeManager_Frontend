import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
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
      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async getVariant(variantId: number): Promise<Variant> {
    throw new Error('Not implemented');
  }

  public async createVariant(recipeId: number, name: string, sizeId: number, description?: string): Promise<Variant> {

    const bodyObj: any = {
      name: name,
      size: sizeId
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
          throw new ApiError(response.status, error.code, error.type, error.message, error);

        case 409:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es existiert bereits eine Rezeptvariante mit diesem Namen.", error);

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error: any) {
      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
        }
  }

  //TODO: implement UpdateVariant
  public async updateVariant(variant: any): Promise<Variant> {
     //create and delete
    throw new Error('Not implemented');
  }

  public async deleteVariant(variantId: number): Promise<void> {
    throw new Error('Not implemented');
  }
}
