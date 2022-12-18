import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Query } from 'src/app/core/query';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-filter-by-name',
  templateUrl: './filter-by-name.component.html',
  styleUrls: ['./filter-by-name.component.css', '../../../../theme/theme.css']
})
export class FilterByNameComponent implements OnInit {

  @Input()
  public title!: string;

  @Input()
  public searchLabel: string = "Suche";

  @Input()
  public searchPlaceholder: string = "Suche";

  @Input()
  public items!: GeneralModelWithRouting[];

  @Input()
  public showClearButton: boolean = true;

  @Input()
  public minimumCharacters: number = 3;

  @Input()
  public delay: number = 1000;

  private lastEmitedValue: string = "";

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
    this.sendQuery(true);
  }
  
  public sendQuery(forceSend: boolean): void {
    if(!forceSend)
    {
      if(this.lastEmitedValue === this.filter) return;
    }
    if(this.filter.length >= this.minimumCharacters) {
      this.outputItems.emit(this.filter);
    } else
      this.outputItems.emit(undefined);

    this.lastEmitedValue = this.filter;
  }
}
