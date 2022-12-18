import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
import { ConversionTypes as ConversionType } from 'src/app/model/conversion-types.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversionTypesService {

  private url_v1 = environment.api.baseUrl + '/conversion_types';

  private _conversionTypes: ConversionType[] = [];

  public get conversionTypes(): ConversionType[] {
    return this._conversionTypes;
  }

  constructor() { }

  public async getAll(): Promise<ConversionType[]> {
    let error: any;
    try {
      let response = await fetch(this.url_v1);
      switch (response.status) {
        case 200:
          this._conversionTypes = (await response.json()).data;
          return this._conversionTypes;

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      } 
    } catch (error) {
      console.warn(error);
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async create(name: string): Promise<ConversionType> {
    let error: any;
    try {
      let response = await fetch(this.url_v1 , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      });
      let res = await response.json();
      switch (response.status) {
        case 201:
          return res.data;

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      console.warn(error);
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async delete(id: number): Promise<void>
  {
    let error: any;
    try {
      let response = await fetch(this.url_v1 + '/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      switch (response.status) {
        case 204:
          break;

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }
}
