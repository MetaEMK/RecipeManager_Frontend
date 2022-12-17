import { Component, OnInit } from '@angular/core';

import { SettingsService } from 'src/app/core/services/settings.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {


  constructor(
    public settingsService: SettingsService,

    ) { }

  public changeTheme(event: any): void {
    this.settingsService.changeTheme(event.target.value);
  }

}
