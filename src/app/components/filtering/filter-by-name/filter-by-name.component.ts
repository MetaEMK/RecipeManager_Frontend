import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Query } from 'src/app/core/services/query';
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
  public showClearButton: boolean = false;

  @Input()
  public minimumCharacters: number = 3;

  @Output("query")
  outputItems: EventEmitter<Query> = new EventEmitter();

  @Output()
  focus: EventEmitter<boolean> = new EventEmitter();

  public filteredItem: Query = new Query();
  public filter: string = "";

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit(): void {
  }

  public sendQuery(): void {
    if(this.filter.length >= this.minimumCharacters) {
      this.filteredItem = new Query();
      this.filteredItem.add("name", this.filter);;
      this.outputItems.emit(this.filteredItem);
    }
  }
}
