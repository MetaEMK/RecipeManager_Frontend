import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public isDarkMode: boolean = false;  
  public get theme(): string {
    return this.isDarkMode ? 'dark' : 'light';
  }

  constructor() { }
}
