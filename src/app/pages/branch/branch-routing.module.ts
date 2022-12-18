import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { BranchOverviewComponent } from './branch-overview/branch-overview.component';

const routes: Routes = [
  { path: '', component: BranchOverviewComponent },
  { path: ':slug', component: BranchEditComponent },
  { path: '**', loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule)}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
