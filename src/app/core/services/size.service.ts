import { Injectable } from '@angular/core';
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
          throw new Error(error.message);
      }
    } catch (error: any) {
      throw new Error(error);
    }

  }

  public async create(conversionTypeId: number, name: string): Promise<Size> {
    let error: any;

    try {
      let response = await fetch(this.url_v1 + '/' + conversionTypeId + '/sizes', {
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
          return (await response.json()).data;

        default:
          error = (await response.json()).error;
          throw new Error(error.message);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async delete(conversionTypeId: number, sizeId: number): Promise<void> {
    let error: any;

    try {
      let response = await fetch(this.url_v1 + '/' + conversionTypeId + '/sizes/' + sizeId, {
        method: 'DELETE'
      });

      switch (response.status) {
        case 204:
          return;

        default:
          error = (await response.json()).error;
          throw new Error(error.message);
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

}
