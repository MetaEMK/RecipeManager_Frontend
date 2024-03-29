import { Injectable } from '@angular/core';
import { Branch } from 'src/app/model/branch.model';
import { environment } from 'src/environment/environment';
import { ApiError } from 'src/app/model/apierror.model';
import { GeneralService } from '../generalService';
import { Query } from '../query';

@Injectable({
  providedIn: 'root'
})
export class BranchService implements GeneralService<Branch> {

  private url_v1 = environment.api.baseUrl + '/branches';

  private _branches: Branch[] = [];

  public get branches(): Branch[] {
    return this._branches;
  }

  constructor() { }

  public async getAll(): Promise<Branch[]> {
    let error: ApiError;
    try {
      let response = await fetch(this.url_v1);
      switch (response.status) {
        case 200:
          this._branches = (await response.json()).data;
          return this._branches;
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.customCode, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      } 
    } catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }

  public async getByQuery(query: Query): Promise<Branch[]> {
    let error: ApiError;
    try {
      let response = await fetch(this.url_v1 + query.toString());
      switch (response.status) {
        case 200:
          return (await response.json()).data;
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.customCode, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }


  public async getById(id: number): Promise<Branch>
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
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async getBySlug(slug: string): Promise<Branch>
  {
    let branch = this._branches.find((branch) => branch.slug === slug);
    try {
      if(!branch) {
        await this.getAll();
        branch = this._branches.find((branch) => branch.slug === slug);
      }
      if(!branch) {
        throw new ApiError(404, 'NOT_FOUND', 'API_BRANCH_SERVICE', 'Die angeforderte Abteilung konnte nicht gefunden werden.');
      }
      return await this.getById(branch.id);
    } catch (error)
    {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }


  public async create(name: string): Promise<Branch> {
    let error: ApiError;
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
      await this.getAll();
      switch (response.status) {
        case 201:
          return (await response.json()).data;

        case 400:
          error = (await response.json()).error;
          throw ApiError.getBadRequestError(error);

        case 409:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.customCode, error.type, 'Es existiert bereits eine Abteilung mit diesem Namen.' , error);
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.customCode, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async update(id: number, addRecipes: number[], rmvRecipes: number[], name?: string): Promise<Branch> {
    let error;
    let bodyObj: any = {};

    if(name) bodyObj.name = name;
    
    let obj = {
      add: addRecipes,
      rmv: rmvRecipes
    };
    
    if (addRecipes.length > 0 || rmvRecipes.length > 0) bodyObj.recipe_ids = obj;

    try {
      let response = await fetch(this.url_v1 + '/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyObj)
      });

      switch (response.status) {
        case 200:
          await this.getAll();
          return (await response.json()).data;

        case 400:
          error = (await response.json()).error;
          throw ApiError.getBadRequestError(error);
        
        case 409:
          error = (await response.json()).error;
          console.log(error);
          throw new ApiError(response.status, error.code, error.type, 'Es existiert bereits eine Abteilung mit diesem Namen.' , error);

        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }

    } catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.', error);
    }
  }

  public async delete(id: number): Promise<void> {
    let error;
    try {
      let response = await fetch(this.url_v1 + '/' + id, {
        method: 'DELETE'
      });
      switch (response.status) {
        case 204:
          await this.getAll();
          return;
        default:
          error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      }
    } catch (error) {
      if(error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.' , error);
    }
  }
}

