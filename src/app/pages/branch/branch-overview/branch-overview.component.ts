import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { Branch } from 'src/app/models/branch.model';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-branch-overview',
  templateUrl: './branch-overview.component.html',
  styleUrls: ['./branch-overview.component.css']
})
export class BranchOverviewComponent implements OnInit {

  public activatedBranch: Branch = new Branch("");

  public recipes: Recipe[] = [];

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private branchService: BranchService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    let getBranchesFromBackend = this.branchService.updateFromServer();
    if(!this.route.snapshot.data['id']) {
      console.log("test");
      this.router.navigate(['branches/new']);
    }
    let branchId = this.route.snapshot.data['id'];
    await getBranchesFromBackend;
    let active = this.branchService.branches.find(branch => branch.id === branchId);
    if(active) 
      this.activatedBranch = active;
    else
      this.router.navigate(['branches/new']);

    this.activatedBranch = await this.branchService.getBranchById(branchId) as Branch;

    this.recipes = this.activatedBranch.recipes;
    console.log(this.recipes);
    this.recipes.forEach(recipe => {
      recipe.image_url = "https://img.chefkoch-cdn.de/rezepte/2374971376648018/bilder/604591/crop-642x428/zwetschgenkuchen-fuer-dummies.jpg";
    });
  }
}
