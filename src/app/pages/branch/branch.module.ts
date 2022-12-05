import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchRoutingModule } from './branch-routing.module';
import { BranchDetailsComponent } from './branch_details/branch-details.component';
import { BranchOverview } from './branch_overview/branch_overview.component';
import { IonicModule, IonInput } from '@ionic/angular';

@NgModule({
  declarations: [
    BranchDetailsComponent,
    BranchOverview
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    IonicModule
  ]
})
export class BranchModule{

 }
