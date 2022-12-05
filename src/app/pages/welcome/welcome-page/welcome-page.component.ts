import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { Branch } from 'src/app/shared/entity/branch';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

routeToBranch(_t8: Branch) {
throw new Error('Method not implemented.');
}

public branches: Branch[] = [];

  constructor(private branchService: BranchService, private router: Router) {
  }

  ngOnInit(): void {
    this.branches = this.branchService.branches;
  }

  public addNewBranch()
  {
    this.router.navigate(['/branch/addBranche']);
  }
}
