import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchDetailsComponent } from './branch_details/branch-details.component';
import { BranchOverview } from './branch_overview/branch_overview.component';

const routes: Routes = [
  {path: 'addBranch', component: BranchDetailsComponent},
  {path: '', component: BranchOverview}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
