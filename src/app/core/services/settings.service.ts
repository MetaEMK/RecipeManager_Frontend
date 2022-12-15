import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService  {

  public isDarkMode: string = "auto";  
  // public get theme(): string {
  //   return this.isDarkMode ? 'dark' : 'light';
  // }

  // public get opposittheme(): string {
  //   return this.isDarkMode ? 'light' : 'dark';
  // }

  public recipeImagePlaceholderPath: string = 'assets/images/placeholder.png';

  constructor() {
    let prefDark = localStorage.getItem('theme');
    this.isDarkMode = prefDark !== null  ? prefDark : "auto";

    let prefersDark;

    switch (this.isDarkMode) {
      case "auto":
        prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.toggleDarkTheme(prefersDark.matches);

      prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
      break;

    case "dark":
      prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.toggleDarkTheme(prefersDark.matches);

      prefersDark.addListener((mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
      break;

    case "light":
      break;
    }
}
  private toggleDarkTheme(shouldAdd: any) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}