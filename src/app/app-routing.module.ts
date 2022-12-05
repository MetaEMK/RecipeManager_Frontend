import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { branches } from 'src/test';
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

branches.forEach(branch => {
  routes.push({path: branch.slug(), loadChildren: () => import('./pages/branch/branch.module').then(m => m.BranchModule)});
});

console.log(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
