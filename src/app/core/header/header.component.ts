import {Component, OnInit} from '@angular/core';
import { Branch } from 'src/app/models/branch.model';
import { BranchService } from '../services/branch.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  timer = new Date();

  public timerValue = this.timer.toLocaleTimeString();
  public timerBool = true;
  public displayTimer = true;

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    while(true) {
      if(window.innerWidth < 510) {
        this.timerBool = false;   
        if(window.innerWidth < 400)
          this.displayTimer = false;
        else
          this.displayTimer = true;
      }
      else {
        this.timerBool = true;
        this.displayTimer = true;
      }
      await this.delay(100);
      this.timer = new Date();
      this.timerValue = this.timer.toLocaleTimeString();
    }
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
