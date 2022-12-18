import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NameEditComponent } from './name-edit/name-edit.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralAddComponent } from './general-add/general-add.component';
import { GeneralItemSelectionComponent } from './general-item-selection/general-item-selection.component';
import { FilteringModule } from '../filtering/filtering.module';
import { GeneralEditRelationsComponent } from './general-edit-relations/general-edit-relations.component';
import { GeneralEditMasterDataComponent } from './general-edit-master-data/general-edit-master-data.component';
import { VariantComponentsModule } from '../variant-components/variant-components.module';
import { GeneralRemoveModalComponent } from './general-remove-modal/general-remove-modal.component';



@NgModule({
  declarations: [
    NameEditComponent,
    GeneralAddComponent,
    GeneralItemSelectionComponent,
    GeneralEditRelationsComponent,
    GeneralEditMasterDataComponent,
    GeneralRemoveModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    FilteringModule,
    VariantComponentsModule
  ],
  exports: [
    NameEditComponent,
    GeneralAddComponent,
    GeneralItemSelectionComponent,
    GeneralEditRelationsComponent,
    GeneralEditMasterDataComponent,
    GeneralRemoveModalComponent,
  ]
})
export class GeneralEditingModule { }
