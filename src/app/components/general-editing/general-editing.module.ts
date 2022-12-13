import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameEditComponent } from './name-edit/name-edit.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralAddComponent } from './general-add/general-add.component';
import { GeneralItemSelectionComponent } from './general-item-selection/general-item-selection.component';
import { FilteringModule } from '../filtering/filtering.module';



@NgModule({
  declarations: [
    NameEditComponent,
    GeneralAddComponent,
    GeneralItemSelectionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    FilteringModule
  ],
  exports: [
    NameEditComponent,
    GeneralAddComponent,
    GeneralItemSelectionComponent
  ]
})
export class GeneralEditingModule { }
