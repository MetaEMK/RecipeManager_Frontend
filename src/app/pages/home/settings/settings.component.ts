import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    constructor(public themeService: SettingsService) { }

    ngOnInit(): void {
      console.log(this.themeService.theme);
    }
}
