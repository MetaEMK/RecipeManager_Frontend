import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output()
  outputItems: EventEmitter<GeneralModel[]> = new EventEmitter();

  @Output()
  focus: EventEmitter<boolean> = new EventEmitter();

  public filteredItems!: GeneralModel[];

  public filter?: string;

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.filter = undefined;
    this.filteredItems = this.items;
    this.outputItems.emit(this.filteredItems);
  }

  public onChangeFilter(event: any)
  {
    this.filter = event.target.value;
    if(this.filter == undefined) 
    {
      this.filteredItems = [];
      this.outputItems.emit(this.filteredItems);
    }
    else
    {
      this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(this.filter!.toLowerCase()));
      this.outputItems.emit(this.filteredItems);
    }
  }

  setFocus(focus: boolean)
  {
    if(!focus) 
    {
      this.filter = undefined;
      this.filteredItems = [];
      this.outputItems.emit(this.filteredItems);
    }
    else
    {
      this.filter = "";
      this.filteredItems = this.items;
    }
    this.focus.emit(focus);
  }
}
