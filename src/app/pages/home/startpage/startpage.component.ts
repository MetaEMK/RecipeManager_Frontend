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
  }

  public showSchedule(branch: Branch)
  {
    this.selectedBranch = branch;
  }

}
