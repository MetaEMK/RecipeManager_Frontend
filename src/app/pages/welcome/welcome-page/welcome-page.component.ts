import {Component, OnInit} from '@angular/core';
import {Echo} from "../../../models/echo.model";
import {BehaviorSubject, debounceTime, skip} from "rxjs";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {


  constructor() {
  }

  ngOnInit(): void
  {
    
  }
}
