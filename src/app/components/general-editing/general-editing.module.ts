import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameEditComponent } from './name-edit/name-edit.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    NameEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    })
  ],
  exports: [
    NameEditComponent
  ]
})
export class GeneralEditingModule { }
