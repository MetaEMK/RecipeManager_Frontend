import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-add-branch-dialog',
  templateUrl: './add-branch-dialog.component.html',
  styleUrls: ['./add-branch-dialog.component.css']
})
export class AddBranchDialogComponent {
  constructor(public dialogRef: DialogRef<string>) {}
}
