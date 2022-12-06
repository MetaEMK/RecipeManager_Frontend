import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { AddBranchDialogComponent } from './branchDetails/add-branch-dialog/add-branch-dialog.component';


@NgModule({
  declarations: [
    BranchDetailsComponent,
    AddBranchDialogComponent,
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ]
})
export class BranchModule { }
