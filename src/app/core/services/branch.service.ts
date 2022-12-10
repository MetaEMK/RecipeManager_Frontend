import { Injectable } from '@angular/core';
import { Branch } from 'src/app/model/branch.model';
import { environment } from 'src/environment/environment';
import { ApiError } from 'src/app/model/apierror.model';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private url_v1 = environment.api.baseUrl + '/v1/branches';

  private _branches: Branch[] = [];

  public get branches(): Branch[] {
    return this._branches;
  }

  constructor() { }


  public async getAllBranches(): Promise<Branch[]> {
    try {
      let response = await fetch(this.url_v1);
      switch (response.status) {
        case 200:
          this._branches = (await response.json()).data;
          return this._branches;

        default:
          const error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      } 
    } catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }

  public async getBranchById(id: number): Promise<Branch>
  {
    try {
      let response = await fetch(this.url_v1 + '/' + id);
      switch (response.status) {
        case 200:
          return (await response.json()).data;
        default:
          const error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      } 
    } catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }

  public async getBranchBySlug(slug: string): Promise<Branch>
  {
    let branch = this._branches.find((branch) => branch.slug === slug);
    try {
      if(!branch) {
        await this.getAllBranches();
        branch = this._branches.find((branch) => branch.slug === slug);
      }
      if(!branch) {
        throw new ApiError(404, 'NOT_FOUND', 'API_BRANCH_SERVICE', 'Die angeforderte Abteilung konnte nicht gefunden werden.');
      }
      return await this.getBranchById(branch.id);
    } catch (error)
    {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }


  public async createBranch(name: string): Promise<Branch> {
    let error: any;
    try {
      let response = await fetch(this.url_v1, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name
        })
      });
      console.log("response");
      console.log(response);
      await this.getAllBranches();
      switch (response.status) {
        case 201:
          return (await response.json()).data;
        case 409:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, 'Es existiert bereits eine Abteilung mit diesem Namen.' , error);
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }
}

