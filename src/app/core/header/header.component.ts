import {Component, OnInit} from '@angular/core';
import { Branch, branches } from 'src/test';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public branches: Branch[] = [];
  color: string = 'dark';
  mode: string = "ios"
  constructor() {
  }

  ngOnInit(): void {
    Branch.addDummyBranches();
    console.log(branches);
    this.branches = branches;
  }

}

