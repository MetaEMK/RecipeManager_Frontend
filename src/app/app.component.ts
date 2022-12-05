import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from './core/services/branch.service';
import { ThemeServiceService } from './core/services/theme-service.service';
import { Branch } from './shared/entity/branch';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public branches: Branch[];
  color: string;
  mode: string;
  
  constructor(themeService: ThemeServiceService, private router: Router, private branchService: BranchService) {
    this.color = themeService.color;
    this.mode = themeService.mode;
    this.branches = branchService.branches;
  }
  
  ngOnInit(): void {
  }

  public routeTo(branch: Branch)
  {
    if(branch.slug)
      this.router.navigate([branch.slug]);
  }
}
