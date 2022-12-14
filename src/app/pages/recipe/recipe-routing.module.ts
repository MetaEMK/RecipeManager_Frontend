import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeOverviewComponent } from './recipe-overview/recipe-overview.component';

const routes: Routes = [
  { path: '', component: RecipeOverviewComponent },
  { path: ':slug/:variantId', pathMatch: 'full', redirectTo: "/torte_a/baum123"},
  { path: ':slug', pathMatch: 'full', component: RecipeDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
