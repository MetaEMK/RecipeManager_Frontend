import {Component} from '@angular/core';
import { Branch, branches } from 'src/test';
import { ThemeServiceService } from './core/services/theme-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public branches: Branch[];
  color: string;
  mode: string;
  
  constructor(themeService: ThemeServiceService) {
    Branch.addDummyBranches();
    this.color = themeService.color;
    this.mode = themeService.mode;
    this.branches = branches;
  }
  
  ngOnInit(): void {
  }
}
