import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'branches', loadChildren: () => import('./pages/branch/branch.module').then(m => m.BranchModule) },
  { path: 'categories', loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule) },
  { path: 'recipes', loadChildren: () => import('./pages/recipe/recipe.module').then(m => m.RecipeModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: '**', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
