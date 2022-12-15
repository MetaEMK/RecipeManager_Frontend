import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-general-model-chip-list',
  templateUrl: './general-model-chip-list.component.html',
  styleUrls: ['./general-model-chip-list.component.css']
})
export class GeneralModelChipListComponent implements OnInit {

  @Input()
  public items: GeneralModelWithRouting[] = [];
  
  @Input()
  public title?: string;

  @Input("showUnassignedButton")
  public showUnassignedButton: boolean = false;

  @Output("unassignedState")
  public unassignedStateOutput: EventEmitter<boolean> = new EventEmitter();

  public stateOfUnassigned: boolean = false;

  @Output("seletedItemIds")
  public selectedItemsOutput: EventEmitter<number[]> = new EventEmitter();
  public selectedItems: number[] = [];

  public get selectAllName(): string {
    if(this.selectedItems.length == this.items.length)
      return "alle auswählen";
    else
      return "alle abwählen";
  }

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    console.log(this.items);
    if(this.items.length === 1)
      this.selectAll();
  }

  public changeUnassignedState()
  {
    this.stateOfUnassigned = !this.stateOfUnassigned;
    this.unassignedStateOutput.emit(this.stateOfUnassigned);
  }


  public selectAll()
  {
    if(this.selectedItems.length > 0)
      this.selectedItems = [];
    else
      this.selectedItems = this.items.map(item => item.id);

    this.selectedItemsOutput.emit(this.selectedItems);
  }

  public changeState(event: GeneralModelWithRouting)
  {
    if (this.selectedItems.includes(event.id))
    {
      this.selectedItems = this.selectedItems.filter(item => item != event.id);
    }
    else
    {
      this.selectedItems.push(event.id);
    }
    this.selectedItemsOutput.emit(this.selectedItems);
  }

}
