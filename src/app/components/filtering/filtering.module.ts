import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByNameComponent } from './filter-by-name/filter-by-name.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    FilterByNameComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot({
      mode: 'ios'
    })
  ],
  exports: [
    FilterByNameComponent
  ]
})
export class FilteringModule { }
