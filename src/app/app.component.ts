import { Component, OnInit } from '@angular/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public time: string ="";


  constructor(
    public themeService: ThemeService
  ) {}

  async ngOnInit(): Promise<void> {
    while(true){
      this.time = new Date().toLocaleTimeString();
      await this.delay(500);
    }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
