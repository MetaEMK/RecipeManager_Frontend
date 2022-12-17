import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ScheduleAddItemModalComponent } from './schedule-add-item-modal/schedule-add-item-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    SchedulerComponent,
    ScheduleAddItemModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    SchedulerComponent,
    ScheduleAddItemModalComponent,
    
  ]
})
export class ScheduleComponentsModule { }
