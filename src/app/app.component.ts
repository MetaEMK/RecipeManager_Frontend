import { Component, OnInit } from '@angular/core';
import { SettingsService } from './core/services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public time: string ="";


  constructor(
    public themeService: SettingsService
  ) {}

  async ngOnInit(): Promise<void> {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.toggleDarkTheme(prefersDark.matches);
    prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
    while(true){
      this.time = new Date().toLocaleTimeString();
      await this.delay(500);
    }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  toggleDarkTheme(shouldAdd: any) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
// Use matchMedia to check the user preference


// Listen for changes to the prefers-color-scheme media query

// Add or remove the "dark" class based on if the media query matches