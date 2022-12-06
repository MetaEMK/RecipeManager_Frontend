import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/core/service/branch.service';
import { Branch } from 'src/app/models/branch';
import {Dialog, DialogRef, DIALOG_DATA} from '@angular/cdk/dialog';
import { AddBranchDialogComponent } from '../branchDetails/add-branch-dialog/add-branch-dialog.component';



@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {

  public branches: Branch[] = [];

  constructor( private branchService: BranchService, public dialog: Dialog) { }

  ngOnInit(): void {
    this.branchService.updateFromServer().then(() => {
      this.branches = this.branchService.branches;
    });
  }

  public addBranch(name: string): void {
    let branch = new Branch(name);
    this.branchService.addBranch(branch);
  }

  openAddDialog(): void {
    this.dialog.open<string>(AddBranchDialogComponent);
  }
}

