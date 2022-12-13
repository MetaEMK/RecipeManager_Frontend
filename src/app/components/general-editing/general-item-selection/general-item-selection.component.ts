import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GeneralModel } from 'src/app/model/generalModel';

@Component({
  selector: 'app-general-item-selection',
  templateUrl: './general-item-selection.component.html',
  styleUrls: ['./general-item-selection.component.css']
})
export class GeneralItemSelectionComponent  implements OnInit {
  
  @Input()
  public items: GeneralModel[] = [];

  @Input()
  public alreadySelectedItems: GeneralModel[] = [];

  @Input()
  public keepSelectedItems: boolean = false;

  @Output("filteredItems")
  public filteredItemsOutput: EventEmitter<number[]> = new EventEmitter();

  public selectedItems: number[] = [];

  public loading: boolean = false;

  public filter?: string;
  public allowedItems: GeneralModel[] = [];
  public filteredItems: GeneralModel[] = [];

  constructor(
    public settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.allowedItems = this.items.filter(item => !this.alreadySelectedItems.find(alreadySelected => alreadySelected.id === item.id));
  }
  public changeItemCheckedValue(item: GeneralModel)
  {
    if(this.selectedItems.find(selectedItem => selectedItem === item.id))
    {
      this.selectedItems = this.selectedItems.filter(selectedItem => selectedItem !== item.id);
    }
    else
    {
      this.selectedItems.push(item.id);
    }
    this.filteredItemsOutput.emit(this.selectedItems);
  }

  public isItemSelected(item: GeneralModel):boolean
  {
    return this.selectedItems.find(selectedItem => selectedItem === item.id) != undefined;
  }

  public onChangeFilter(event: any)
  {
    if(!this.keepSelectedItems)
      this.selectedItems = event;
    else {

    }
  }
}
