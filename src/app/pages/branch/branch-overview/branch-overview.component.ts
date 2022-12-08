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
  
  public branches: Branch[] = [];

    constructor(
      private branchService: BranchService,
      private router: Router,
      public themeService: ThemeService
    ) { }
  
    ngOnInit(): void {
      this.branchService.getAllBranches()
        .then((branches) => {
          this.branches = branches;
        })
        .catch((error) => {
          console.log(error);
        });
      }

    public navigateToBranch(branch: Branch)
    {
      this.router.navigate([branch.slug]);
    }
  
}
