import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchDetailsComponent } from './branch-details/branch-details.component';

const routes: Routes = [
  { path: 'new', component: BranchDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
