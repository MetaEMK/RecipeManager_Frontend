import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch.service';
import { Branch } from 'src/app/models/branch.model';
import { AddBranchDialogComponent } from './add-branch-dialog/add-branch-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {

  public branches: Branch[] = [];


  constructor(
    private branchService: BranchService, 
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.branchService.updateFromServer().then(() => {
        this.branches = this.branchService.branches;
      }
    )};


  async openAddDialog(): Promise<void> {
    const ref = this.dialog.open(AddBranchDialogComponent);
    ref.afterClosed().subscribe(async (result: Branch) => {
      if(result) {
        await this.branchService.addBranch(result);
        await this.branchService.updateFromServer()
        this.branches = this.branchService.branches;
      }
    });
  }

  public navigateTo(branch: Branch): void {
    this.router.navigate([branch.slug]);
  }
}

