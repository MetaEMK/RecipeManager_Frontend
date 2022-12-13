import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GeneralModel } from 'src/app/model/generalModel';

@Component({
  selector: 'app-general-model-chip-list',
  templateUrl: './general-model-chip-list.component.html',
  styleUrls: ['./general-model-chip-list.component.css']
})
export class GeneralModelChipListComponent implements OnInit {

  @Input()
  public items: GeneralModel[] = [];

  @Input("unAssignedItems")
  public showUnassignedButton: boolean = false;

  @Output("showUnassignedItems")
  public showUnassignedItemsOutput: EventEmitter<boolean> = new EventEmitter();
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
  }

  public changeUnassignedState()
  {
    this.stateOfUnassigned = !this.stateOfUnassigned;
    this.showUnassignedItemsOutput.emit(this.stateOfUnassigned);
  }

  public get unassignedState(): string
  {
    if(this.stateOfUnassigned)
      return "primary";
    else
      return this.settingsService.opposittheme;
  }

  public selectAll()
  {
    if(this.selectedItems.length > 0)
      this.selectedItems = [];
    else
      this.selectedItems = this.items.map(item => item.id);

    this.selectedItemsOutput.emit(this.selectedItems);
  }

  public get selectAllState(): string
  {
    if(this.selectedItems.length == this.items.length)
      return "primary";
    else
      return this.settingsService.opposittheme;
  }

  public changeState(event: GeneralModel)
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

  public getState(item: GeneralModel)
  {
    if(this.selectedItems.includes(item.id))
    {
      return "primary";
    }
    else
    {
      return this.settingsService.opposittheme
    }
  }

}
