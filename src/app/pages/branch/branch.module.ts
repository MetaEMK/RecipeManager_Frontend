import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchOverviewComponent } from './branch-overview/branch-overview.component';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    BranchOverviewComponent,
    BranchEditComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    IonicModule.forRoot()
  ]
})
export class BranchModule { }
