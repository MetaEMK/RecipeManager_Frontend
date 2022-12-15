import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService  {

  public isDarkMode: boolean = false;  
  public get theme(): string {
    return this.isDarkMode ? 'dark' : 'light';
  }

  public get opposittheme(): string {
    return this.isDarkMode ? 'light' : 'dark';
  }

  public recipeImagePlaceholderPath: string = 'assets/images/placeholder.png';

  constructor() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
  }
}
