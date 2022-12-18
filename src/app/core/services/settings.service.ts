import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService  {

  public themeMode: string = "auto"; 


  public recipeImagePlaceholderPath: string = 'assets/images/placeholder.png';

  constructor() {
    this.changeTheme();
  }

  public changeTheme(toTheme?: string): void {

    if (toTheme) {
      localStorage.setItem('theme', toTheme);
    }

    let prefDark = localStorage.getItem('theme');

    switch (prefDark) {
      case "dark":
        this.themeMode = "dark";
        break;
      case "light":
        this.themeMode = "light";
        break;
      default:
        this.themeMode = "auto";
        break;
    }

    let prefersDark;
    
    switch (this.themeMode) {
      case "auto":
        prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.toggleDarkTheme(prefersDark.matches);

      prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
      break;

    case "dark":
      this.toggleDarkTheme(true);
      break;

    case "light":
      this.toggleDarkTheme(false);
      break;
    }
  }

  private toggleDarkTheme(shouldAdd: any) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}