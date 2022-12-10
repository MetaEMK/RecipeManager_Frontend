import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchAddComponent } from 'src/app/components/branch/branch-add/branch-add.component';
import { BranchOverviewComponent } from './branch-overview/branch-overview.component';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    BranchOverviewComponent,
    BranchEditComponent,
    BranchAddComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    IonicModule.forRoot(
      {
        mode: 'ios'
      }
    ),
    FormsModule
  ]
})
export class BranchModule { }
