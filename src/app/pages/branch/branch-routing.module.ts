import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { branches } from 'src/test';
import { BranchOverview } from './branch_overview/branch_overview.component';

const routes: Routes = [
  {path: '', component: BranchOverview}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
