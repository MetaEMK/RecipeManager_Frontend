import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from 'src/app/models/apierror.model';
import { Branch } from 'src/app/models/branch.model';



const backend_url = "http://localhost:3000/api/v1";


@Injectable({
  providedIn: 'root'
})
export class BranchService {
  
  private _branches: Branch[] = [];

  public get branches() 
  {
    return this._branches;
  }

  constructor(private router: Router) { }


  public async getBranchById(id: number): Promise<Branch|ApiError> {
    try {
      let response = await fetch(backend_url + "/branches/" + id.toString());

      switch(response.status) {
        case 200:
          let branch = (await response.json()).data;;
          return branch;
        case 404:
          return new ApiError(404, "BranchNotFound", "Die Abteilung konnte nicht gefunden werden.");
        case 400:
          return new ApiError(400, "DUMMYFOR400", "HALLO ICH BIN EINE DUMMY NACHRICHT FÜR 400");
        default :
          console.log(response);
          return new ApiError(response.status, "UnknownError", "Ein unbekannter Fehler ist aufgetreten.");
      }
    } catch (error) {
      console.log(error);
      return new ApiError(500, "UnknownError", "Ein unbekannter Fehler ist aufgetreten.");
    }
  }

  public async updateFromServer(): Promise<Branch[]|ApiError> {
    
    let response = await fetch(backend_url + "/branches");

    switch (response.status) {
      case 200:
        this._branches = (await response.json()).data;
        this._branches.forEach(branch => {
          if(!this.doesPathExist(branch)) 
            this.router.config.unshift({path: branch.slug, data: {id: branch.id}, loadChildren: () => import('../../pages/branch/branch.module').then(m => m.BranchModule)});
          });
          return this._branches
        default:
          console.log(response);
          return new ApiError(response.status, "UnknownError", "Ein unbekannter Fehler ist aufgetreten.");
    }

    return this._branches;
  }

  public async addBranch(branch: Branch)
  {
    try {
      if(branch.name) {
        let restponse = await fetch(backend_url + "/branches", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: branch.name}),
        })

        
        if(restponse.status === 200){
          await this.updateFromServer();
          return;
        }
        else {
          if(restponse.status === 409) {
            return "Die Abteilung existiert bereits.";
          }
        }
      }
      
    } catch (error) {
      console.log(error)
      return error;
    }

  }

  private doesPathExist(branch: Branch): boolean {
    let status = false;
    this.router.config.forEach(route => {
      if(route.path === branch.slug && route.data && route.data["id"] === branch.id) status = true;
    });
    return status;
  }

  public async updateBranch(branch: Branch)
  {
    if(branch.name && branch.id) {
      try {
        let restresponse = await fetch(backend_url + "/branches/" + branch.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: branch.name}),
        });
        console.log(restresponse);
        if(restresponse.status === 200) {
          await this.updateFromServer();
          return;
        } else {
          console.log(restresponse);
          return restresponse;
        }
      } catch (error) {
        console.log(error)
        return error;
      }
    }
  }

  public async deleteBranch(id: number)
  {
    try {

      let restresponse = await fetch(backend_url + "/branches/" + id.toString(), {
        method: 'DELETE'
      })
      if(restresponse.status === 204) {
        await this.updateFromServer();
        return;
      }
      else {
        console.log(restresponse);
        let error = "Die Abteilung konnte nicht gefunden werden.";
        console.log(error);
        return error;
      }
    } catch (error) {
      return await error;
    }
  }
}
