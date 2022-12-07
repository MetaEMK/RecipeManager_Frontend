import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private branchService: BranchService,
  ) {
  }

  async ngOnInit(): Promise<void> {
    
    await this.branchService.updateFromServer();
    await this.delay(1000);
    
    this.route.snapshot.url.forEach((urlSegment) => {
      let test = this.branchService.branches.find(branch => branch.slug === urlSegment.path)
      if(test) {
        console.log(test)
        this.router.navigate([test.slug]);
      }
    });
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
}
