import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeOverviewComponent } from './recipe-overview/recipe-overview.component';
import { VariantDetailsComponent } from './variant/variant-details/variant-details.component';

const routes: Routes = [
  { path: '', component: RecipeOverviewComponent },
  { path: ':recipeIdentifier/variant/:variantId', pathMatch: 'full', component: VariantDetailsComponent},
  { path: ':recipeIdentifier', pathMatch: 'full', component: RecipeDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
