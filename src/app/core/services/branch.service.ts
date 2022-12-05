import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { Branch } from 'src/app/shared/entity/branch';

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

  private getLastId(): number
  {
    let max = -1;
    this._branches.forEach(br => 
      {
      if (br.id) br.id > max ? max = br.id : max = max;
    });
    return max;
  }

  public checkInput()
  {

  }

  public addBranch(branch: Branch)
  {
    branch.id = this.getLastId()+1;
    this.router.config.unshift({
      path: branch.slug,
      data: {id: branch.id},
      loadChildren: () => import('../../pages/branch/branch.module').then(module => module.BranchModule)
    });
    this._branches.push(branch);
  }

  public deleteBranch(id: number)
  {
    this._branches = this._branches.filter(br => 
      {
        if(br.id) br.id !== id;
      });
  }
}
