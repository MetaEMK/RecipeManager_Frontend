import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { ThemeServiceService } from 'src/app/core/services/theme-service.service';
import { Branch } from 'src/app/shared/entity/branch';


@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.css']
})
export class BranchDetailsComponent implements OnInit {


  public branches: any[] = [];
  public newBranchName: string|undefined;

  public newBranchColor: string = "dark";

  constructor(private branchService: BranchService, private router: ActivatedRoute, private designService: ThemeServiceService)
  {
  }

  ngOnInit(): void
  {
    this.getAllBranches();
  }

  getAllBranches()
  {
    this.branches = this.branchService.branches;
    this.branches.forEach(br => {
      br.editMode = true;
    });
  }

  checkInput(event: any) {
  
    this.newBranchColor = "dark";
    this.newBranchName = event.detail.value;
  }

  public addNewBranch()
  {
    if(!this.newBranchName) {
      this.newBranchColor = "danger";
      return;
    }
    console.log("Adding: " + this.newBranchName)
    this.branchService.addBranch(new Branch(this.newBranchName, undefined, this.newBranchName.toLocaleLowerCase()));
    this.getAllBranches();
    this.newBranchName = undefined;
  }

  public updateBranch(event: any, branch: Branch)
  {
    branch.name = event.detail.value;
  }

  public acceptUpdate(branch: Branch)
  {
    this.branchService.updateBranch(branch);
  }

  public updateBranchName(branch: any)
  {
    branch.editMode = false;
    console.log("Updating: " + branch.name);
  }
  public deleteBranch(branch: Branch)
  {
    if(branch.id) this.branchService.deleteBranch(branch.id);
    this.getAllBranches();
  }
  
}
