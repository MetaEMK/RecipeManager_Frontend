import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantCardComponent } from './variant-card/variant-card.component';
import { IonicModule } from '@ionic/angular';
import { VariantAddModalComponent } from './variant-add-modal/variant-add-modal.component';
import { FormsModule } from '@angular/forms';
import { VariantSizeSelecterComponent } from './variant-size-selecter/variant-size-selecter.component';



@NgModule({
  declarations: [
    VariantCardComponent,
    VariantAddModalComponent,
    VariantSizeSelecterComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(
      { mode: 'ios' }
    ),
    FormsModule
  ],
  exports: [
    VariantCardComponent,
    VariantAddModalComponent,
    VariantSizeSelecterComponent
  ]
})
export class VariantComponentsModule { }
