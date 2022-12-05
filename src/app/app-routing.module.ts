import {NgModule} from '@angular/core';
import {RouteConfigLoadStart, RouterModule, Routes} from '@angular/router';
import { Branch } from './shared/entity/branch';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: '404',
    component: PageNotFoundComponent
  }
];
routes.push({path: 'branch', loadChildren: () => import('./pages/branch/branch.module').then(m => m.BranchModule)});
routes.push({path: '**', redirectTo: '/404'});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
