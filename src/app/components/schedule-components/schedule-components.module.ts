import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ScheduleAddItemModalComponent } from './schedule-add-item-modal/schedule-add-item-modal.component';
import { IonicModule } from '@ionic/angular';
import { GeneralEditingModule } from '../general-editing/general-editing.module';
import { VariantComponentsModule } from '../variant-components/variant-components.module';



@NgModule({
  declarations: [
    SchedulerComponent,
    ScheduleAddItemModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    GeneralEditingModule,
    VariantComponentsModule
  ],
  exports: [
    SchedulerComponent,
    ScheduleAddItemModalComponent,    
  ]
})
export class ScheduleComponentsModule { }
