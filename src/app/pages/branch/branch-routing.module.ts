import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchOverviewComponent } from './branch-overview/branch-overview.component';

const routes: Routes = [
  { path: '', component: BranchOverviewComponent },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
