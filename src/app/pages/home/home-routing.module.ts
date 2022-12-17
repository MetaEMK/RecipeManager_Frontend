import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { SchedulerDetailsComponent } from './scheduler-details/scheduler-details.component';
import { SettingsComponent } from './settings/settings.component';
import { StartpageComponent } from './startpage/startpage.component';

const routes: Routes = [
  { path: '', pathMatch:'full', component: StartpageComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'scheduler/:branchId/:day', pathMatch: 'full', component: SchedulerDetailsComponent },
  { path: '404', component: NotFoundComponent},
  { path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
