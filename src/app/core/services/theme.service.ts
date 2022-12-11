import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public isDarkMode: boolean = true;  
  public get theme(): string {
    return this.isDarkMode ? 'dark' : 'light';
  }
  public get opposittheme(): string {
    return this.isDarkMode ? 'light' : 'dark';
  }

  constructor() { }
}
