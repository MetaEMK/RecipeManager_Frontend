import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Branch } from 'src/app/model/branch.model';

@Component({
  selector: 'app-branch-overview',
  templateUrl: './branch-overview.component.html',
  styleUrls: ['./branch-overview.component.css']
})
export class BranchOverviewComponent implements OnInit {

  public isInAddingMode: boolean = false;

    constructor(
      public branchService: BranchService,
      private router: Router,
      public themeService: ThemeService
    ) { }
  
    ngOnInit(): void {
      console.log("test123");
      this.branchService.getAllBranches();
      }

    public navigateToBranch(branch: Branch)
    {
      this.router.navigate(["/branches", branch.slug]);
    }
  
}
