import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
import { ConversionTypes } from 'src/app/model/conversion-types.model';
import { Conversion } from 'src/app/model/conversion.model';
import { environment } from 'src/environment/environment';
import { Query } from '../query';

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  private url_v1 = environment.api.baseUrl + '/conversion_types';

  constructor() { }

  public async getConversion(conversionType: ConversionTypes, query?: Query): Promise<Conversion[]>
  {
    try
    {
      let response = await fetch(this.url_v1 + '/' + conversionType.id + "/conversions" + query?.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      let error: any;
      switch(response.status)
      {
        case 200:
          return (await response.json()).data;

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error); 
    }
    } catch (error) {
      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }
}
