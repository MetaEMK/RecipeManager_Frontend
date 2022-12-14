import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Query } from 'src/app/core/query';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GeneralModel } from 'src/app/model/generalModel';

@Component({
  selector: 'app-filter-by-name',
  templateUrl: './filter-by-name.component.html',
  styleUrls: ['./filter-by-name.component.css']
})
export class FilterByNameComponent implements OnInit {

  @Input()
  public title!: string;

  @Input()
  public items!: GeneralModel[];

  @Input()
  public showClearButton: boolean = true;

  @Input()
  public minimumCharacters: number = 3;

  @Input()
  public delay: number = 500;

  @Output("value")
  outputItems: EventEmitter<string> = new EventEmitter();

  @Output()
  focus: EventEmitter<boolean> = new EventEmitter();

  public filteredItem: Query = new Query();
  public filter: string = "";

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit(): void {
  }

  public clearInput(): void {
    this.filter = "";
    this.sendQuery();
  }
  
  public sendQuery(): void {
    if(this.filter.length >= this.minimumCharacters) {
      this.outputItems.emit(this.filter);
    } else
      this.outputItems.emit(undefined);
  }
}
