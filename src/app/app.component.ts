import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public time: string ="";

  async ngOnInit(): Promise<void> {
    while(true){
      console.log("tick");
      this.time = new Date().toLocaleTimeString();
      await this.delay(250);
    }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }
}
