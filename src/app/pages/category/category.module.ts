import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CategoryAddModalComponent } from 'src/app/components/category/category-add-modal/category-add-modal.component';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';


@NgModule({
  declarations: [
    CategoryAddModalComponent,
    CategoryOverviewComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    FormsModule,
  ]
})
export class CategoryModule { }
