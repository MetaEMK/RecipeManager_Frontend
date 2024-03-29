import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Query } from 'src/app/core/query';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-filter-by-name',
  templateUrl: './filter-by-name.component.html',
  styleUrls: ['./filter-by-name.component.css', '../../../../theme/theme.css']
})
export class FilterByNameComponent {

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
  public delay: number = 250;

  private lastEmitedValue: string = "";

  @Output("value")
  outputItems: EventEmitter<string> = new EventEmitter();

  @Output()
  focus: EventEmitter<boolean> = new EventEmitter();

  public filteredItem: Query = new Query();
  public filter: string = "";

  constructor() { }

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
