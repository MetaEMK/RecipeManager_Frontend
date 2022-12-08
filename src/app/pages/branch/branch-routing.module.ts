import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { BranchOverviewComponent } from './branch-overview/branch-overview.component';

const routes: Routes = [
  { path: 'overview', component: BranchDetailsComponent },
  { path: '', component: BranchOverviewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
