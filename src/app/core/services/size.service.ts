import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
import { Size } from 'src/app/model/size.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  private url_v1 = environment.api.baseUrl + '/conversion_types';

  constructor() { }

  public async getAll(conversionTypeId: number): Promise<Size[]> {
    let error: any;

    try {
      let response = await fetch(this.url_v1 + '/' + conversionTypeId + '/sizes');

      switch (response.status) {
        case 200:
          return (await response.json()).data;

        default:
          error = (await response.json()).error;
          throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
      }
    } catch (error: any) {
      if (error instanceof ApiError)
        throw error;

      throw new ApiError(500, 'API_ERROR', 'API_CONVERSION_TYPES_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }

  }
}
