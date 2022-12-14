import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  public isDarkMode: boolean = this.settingsService.isDarkMode; 

  constructor(public settingsService: SettingsService) { }

  public changeTheme(): void {
    this.settingsService.isDarkMode = !this.settingsService.isDarkMode;
    localStorage.setItem('theme', this.settingsService.theme);
  }

}
