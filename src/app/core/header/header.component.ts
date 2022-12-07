import {Component, OnInit} from '@angular/core';
import { Branch } from 'src/app/models/branch';
import { BranchService } from '../services/branch.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public branches: Branch[] = [];

  constructor(private branchService: BranchService) {
  }

  ngOnInit(): void {
    this.branchService.updateFromServer().then(branches => this.branches = branches);
  }

}
