import { Injectable } from '@angular/core';
import { ApiError } from 'src/app/model/apierror.model';
import { ScheduleItem } from 'src/app/model/scheduleItem.model';
import { environment } from 'src/environment/environment';
import { Query } from '../query';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private url_v1 = environment.api.baseUrl + '/branches';

  // Map<BranchId, ScheduleItem[]>
  private _scheduleMap: Map<number, ScheduleItem[]> = new Map();
  public get scheduleMap(): Map<number, ScheduleItem[]> {
    return this._scheduleMap;
  }

  constructor() { }


  public async getAllByBranchId(branchId: number, query?: Query): Promise<ScheduleItem[]> {
    let url = `${this.url_v1}/${branchId}/schedule`;
    if(query) url += query.toString();
    let error: any;

    try {
      let response = await fetch(url)

      switch (response.status) {
        case 200:
          const items: ScheduleItem[] = (await response.json()).data;
          this._scheduleMap.set(branchId, items);
          return items;

        case 404:
          error = (await response.json()).error;
          this._scheduleMap.delete(branchId);
          throw new ApiError(response.status, error.code, error.type, error.message, error);

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error: any) {
      throw new ApiError(500, 'API_ERROR', 'API_SCHEDULE_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async createSchuleItem(branchId: number, day: number, variantId: number, sizeId: number, quantity: number): Promise<ScheduleItem> {
    const url = `${this.url_v1}/${branchId}/schedule`;
    let error: any;

    try {
      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          day: day,
          variant_id: variantId,
          size_id: sizeId,
          quantity: quantity
        })
      });

      switch (response.status) {
        case 201:
          await this.getAllByBranchId(branchId);
          return (await response.json()).data;

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error: any) {
      throw new ApiError(500, 'API_ERROR', 'API_SCHEDULE_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async deleteScheduleItem(branchId: number, scheduleItemId: number): Promise<void> {
    const url = `${this.url_v1}/${branchId}/schedule/${scheduleItemId}`;
    let error: any;

    try {
      let response = await fetch(url, {
        method: 'DELETE'
      });

      switch (response.status) {
        case 204:
          await this.getAllByBranchId(branchId);
          return;

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    }
    catch (error: any) {
      throw new ApiError(500, 'API_ERROR', 'API_SCHEDULE_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }
}
