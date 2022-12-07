import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { BranchDetailsComponent } from '../branch-details.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Branch } from 'src/app/models/branch.model';
import { BranchService } from 'src/app/core/services/branch.service';

@Component({
  selector: 'app-add-branch-dialog',
  templateUrl: './add-branch-dialog.component.html',
  styleUrls: ['./add-branch-dialog.component.css']
})
export class AddBranchDialogComponent {

  public errorMessage? : string;

  constructor(
    private branchService: BranchService,
    public dialogRef: MatDialogRef<BranchDetailsComponent>) {}


  public addBranch(name: string): void {
    this.branchService.addBranch(new Branch(name)).then((error) => {
      console.log(error);
      if(error) {
        this.errorMessage = error.toString();
      }
      else {
        this.dialogRef.close(true);
      }
    });
  }
  abortDialog(): void {
    this.dialogRef.close();
  }
}
