import { Component, OnInit } from '@angular/core';
import { BranchService } from 'src/app/core/services/branch.service';
import { Branch } from 'src/app/model/branch.model';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  public selectedBranch?: Branch;

  constructor(
    public branchService: BranchService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.branchService.getAll();
    this.selectedBranch = this.branchService.branches[0];
  }

  public showSchedule(branch: Branch)
  {
    this.selectedBranch = branch;
  }

  public enabledButton(branch: Branch)
  {
    if (!this.selectedBranch)
      return false;

    if(branch.id === this.selectedBranch.id) {
      return true
    } else {
      return false
    }
  }
}
