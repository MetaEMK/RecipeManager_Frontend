import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterByNameComponent } from './filter-by-name/filter-by-name.component';
import { IonicModule } from '@ionic/angular';
import { FilterByGeneralModelComponent } from './filter-by-general-model/filter-by-general-model.component';
import { GeneralModelChipListComponent } from './general-model-chip-list/general-model-chip-list.component';



@NgModule({
  declarations: [
    FilterByNameComponent,
    FilterByGeneralModelComponent,
    GeneralModelChipListComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot({
      mode: 'ios'
    })
  ],
  exports: [
    FilterByNameComponent,
    FilterByGeneralModelComponent
  ]
})
export class FilteringModule { }
