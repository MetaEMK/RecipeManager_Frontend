import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchDetailsComponent } from './branch-details/branch-details.component';
import { AddBranchDialogComponent } from './branch-details/add-branch-dialog/add-branch-dialog.component';
import { BranchOverviewComponent } from './branch-overview/branch-overview.component';


@NgModule({
  declarations: [
    BranchDetailsComponent,
    AddBranchDialogComponent,
    BranchOverviewComponent,
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSnackBarModule,
  ]
})
export class BranchModule { }
