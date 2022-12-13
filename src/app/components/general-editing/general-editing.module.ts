import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameEditComponent } from './name-edit/name-edit.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralAddComponent } from './general-add/general-add.component';



@NgModule({
  declarations: [
    NameEditComponent,
    GeneralAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    })
  ],
  exports: [
    NameEditComponent,
    GeneralAddComponent
  ]
})
export class GeneralEditingModule { }
