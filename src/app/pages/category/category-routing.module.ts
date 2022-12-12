import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';

const routes: Routes = [
  { path: '', component: CategoryOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
