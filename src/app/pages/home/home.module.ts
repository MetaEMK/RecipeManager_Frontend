import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { StartpageComponent } from './startpage/startpage.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    StartpageComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
