import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';

const routes: Routes = [
  { path: '', component: CategoryOverviewComponent },
  { path: ':slug', component: CategoryDetailsComponent },
  { path: '**', loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule)}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
