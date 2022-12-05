import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { ThemeServiceService } from 'src/app/core/services/theme-service.service';
import { Branch } from 'src/app/shared/entity/branch';
import { Category } from 'src/app/shared/entity/category';
import { Recipe } from 'src/app/shared/entity/recipe';

@Component({
  selector: 'branch_overview',
  templateUrl: './branch_overview.component.html',
  styleUrls: ['./branch_overview.component.css']
})
export class BranchOverview implements OnInit {

  public bra: Branch|undefined;

  public categories: Category[] = [];
  public recipe: Recipe[] = [];

  public mode: string;
  public color: string;

  constructor(themeService: ThemeServiceService, private route: ActivatedRoute, private branchService: BranchService, private router: Router) {
    this.color = "dark"
    this.mode = themeService.mode;
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.data);
    let data = this.route.snapshot.data['id'];
    console.log(data);
    let test = this.branchService.branches.filter(b => b?.id === data);
    if (test && test.length === 1) {
      this.bra = test[0];
    }
    else
    {
      this.router.navigate(['addBranch']);
    }
    console.log(test);
  }


}