import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantCardComponent } from './variant-card/variant-card.component';
import { IonicModule } from '@ionic/angular';
import { VariantAddModalComponent } from './variant-add-modal/variant-add-modal.component';
import { FormsModule } from '@angular/forms';
import { VariantSizeSelecterComponent } from './variant-size-selecter/variant-size-selecter.component';
import { VariantSectionComponent } from './variant-section/variant-section.component';
import { VariantEditIngredientModalComponent } from './variant-edit-ingredient-modal/variant-edit-ingredient-modal.component';



@NgModule({
  declarations: [
    VariantCardComponent,
    VariantAddModalComponent,
    VariantSizeSelecterComponent,
    VariantSectionComponent,
    VariantEditIngredientModalComponent
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
    VariantSizeSelecterComponent,
    VariantSectionComponent
  ]
})
export class VariantComponentsModule { }
