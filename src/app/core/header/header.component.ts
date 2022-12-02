import {Component, OnInit} from '@angular/core';
import { Branch, branches } from 'src/test';
import { ThemeServiceService } from '../services/theme-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public branches: Branch[] = [];
  color: string;
  mode: string;
  
  constructor(themeService: ThemeServiceService) {
    this.color = themeService.color;
    this.mode = themeService.mode;
  }
  
  ngOnInit(): void {
    Branch.addDummyBranches();
    console.log(branches);
    this.branches = branches;
  }

}

