import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameEditComponent } from './name-edit/name-edit.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralAddComponent } from './general-add/general-add.component';
import { GeneralItemSelectionComponent } from './general-item-selection/general-item-selection.component';
import { FilteringModule } from '../filtering/filtering.module';
import { GeneralEditRelationsComponent } from './general-edit-relations/general-edit-relations.component';



@NgModule({
  declarations: [
    NameEditComponent,
    GeneralAddComponent,
    GeneralItemSelectionComponent,
    GeneralEditRelationsComponent,
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
    GeneralItemSelectionComponent,
    GeneralEditRelationsComponent
  ]
})
export class GeneralEditingModule { }
