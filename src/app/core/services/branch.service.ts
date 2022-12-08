import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }


  public async getAllBranches(): Promise<Branch[]> {
    try {
      let response = await fetch(this.url_v1);
      switch (response.status) {
        case 200:
          this._branches = (await response.json()).data;
          this.setRouting();
          return this._branches;

        default:
          const error = (await response.json()).error;
          throw new ApiError(response.status, error.code, error.type, "Es ist ein unbekannter Fehler aufgetreten. Bitte versuchen Sie es später erneut", error);
      } 
    } catch (error) {
      console.log(error);
      throw new ApiError(500, 'API_ERROR', 'API_BRANCH_SERVICE', 'Es ist ein Fehler bei der Kommunikation mit dem Server aufgetreten. Bitte versuchen Sie es später erneut.');
    }
  }

  public setRouting(): void {
    if(this.branches.length === 0) return;
    
    this.branches.forEach(branch => {
      let status = false;
      this.router.config.forEach(route => {
        if (route.path === branch.slug) {
            status = true;
          }
        });
      if (!status) {
        this.router.config.unshift({
          path: branch.slug,
          loadChildren: () => import('src/app/pages/branch/branch.module').then(m => m.BranchModule),
          data: { id: branch.id }
        });
      }
    });
  }
}

