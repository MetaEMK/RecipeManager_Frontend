import {Component, OnInit} from '@angular/core';
import { Branch } from 'src/app/models/branch.model';
import { BranchService } from '../services/branch.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void {
  }

}
