import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';
import { StartpageComponent } from './startpage/startpage.component';

const routes: Routes = [
  { path: '', component: StartpageComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
