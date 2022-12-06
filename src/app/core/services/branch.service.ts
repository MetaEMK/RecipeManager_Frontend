import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { Branch } from 'src/app/shared/entity/branch';


const backend_url = "http://localhost:3000/api";
@Injectable({
  providedIn: 'root'
})
export class BranchService {


  private _branches: Branch[] = [];

  constructor(private router: Router) {
  }

  public get branches() 
  {
    return this._branches;
  }

  public async updateFromServer(): Promise<Branch[]> {
    
    let response = await fetch(backend_url + "/branches").then(res => res.json());

    if(response.success) {
      this._branches = response.data;
    }

    return this._branches;
  }

  public async addBranch(branch: Branch)
  {
    if(branch.name) {
      let restponse = await fetch(backend_url + "/branches", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: branch.name}),
      }).then(res => res.json());
      if(!restponse.success){
        console.log(restponse);
        return restponse.error;
      }
      else {
      await this.updateFromServer();
      return;

      }
      this.router.config.unshift({
        path: branch.slug,
        data: {id: branch.id},
        loadChildren: () => import('../../pages/branch/branch.module').then(module => module.BranchModule)
      });
    }
  }

  public async updateBranch(branch: Branch)
  {
    if(branch.name && branch.id) {
      let restresponse = await fetch(backend_url + "/branches/" + branch.id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: branch.name}),
      }).then(res => res.json());

      if(!restresponse.success){
        console.log(restresponse);
        return restresponse.error.code;
      } else 
      await this.updateFromServer();
      return;
    }
  }
  public async deleteBranch(id: number)
  {
      let restresponse = await fetch(backend_url + "/branches/" + id.toString(), {
        method: 'DELETE'
      })
      if(restresponse.status === 204) {
        await this.updateFromServer();
        return;
      }
      else {
        console.log(restresponse);
      }
  }
}
