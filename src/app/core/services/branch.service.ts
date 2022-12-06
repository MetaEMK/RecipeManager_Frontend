import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { Branch } from 'src/app/shared/entity/branch';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  private _branches: Branch[] = [
    {id: 0, name: "Test1"},
    {id: 1, name: "Test1"},
    {id: 2, name: "Test1"},
    {id: 3, name: "Test1"},
    {id: 4, name: "Test1"},
    {id: 5, name: "Test1"},
    {id: 6, name: "Test1"},
    {id: 7, name: "Test1"},
    {id: 8, name: "Test1"},
    {id: 9, name: "Test1"},
  ];

  constructor(private router: Router) {
  }

  public get branches() 
  {
    return this._branches;
  }

  private getLastId(): number
  {
    return this.branches.length-1;
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

  public updateBranch(branch: Branch)
  {
    if(branch.id) this.branches[branch.id] = branch;
  }

  public deleteBranch(id: number)
  {
    this._branches = this._branches.filter(b => b.id !== id);
  }
}
