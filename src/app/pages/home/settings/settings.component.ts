import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    constructor(public themeService: ThemeService) { }

    ngOnInit(): void {
      console.log(this.themeService.theme);
    }
}
