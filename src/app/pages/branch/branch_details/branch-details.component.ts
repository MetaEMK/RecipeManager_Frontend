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


  public branches: Branch[] = [];
  public test: any;
  public test2: any;

  constructor(private branchService: BranchService, private router: ActivatedRoute, private designService: ThemeServiceService)
  {
    
  }

  ngOnInit(): void
  {
    this.branches = this.branchService.branches;
  }

  checkInput(event: any) {
    this.test = event.detail.value;
  }

  public addNewBranch(str?: string)
  {
    if(!this.test) this.test = "test";
    console.log("Adding: " + this.test)
    this.branchService.addBranch(new Branch(this.test, undefined, this.test.toLocaleLowerCase()));
    this.branches = this.branchService.branches;
  }
  
}
