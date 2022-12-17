import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { StartpageComponent } from './startpage/startpage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SettingsComponent } from './settings/settings.component';

import { IonicModule } from '@ionic/angular';
import { ScheduleComponentsModule } from 'src/app/components/schedule-components/schedule-components.module';


@NgModule({
  declarations: [
    StartpageComponent,
    NotFoundComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IonicModule.forRoot(
      {
        mode: 'ios'
      }
    ),
    FormsModule,
    ScheduleComponentsModule
  ]
})
export class HomeModule { }
