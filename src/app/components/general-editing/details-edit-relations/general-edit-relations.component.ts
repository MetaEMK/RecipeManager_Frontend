import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { GeneralService } from 'src/app/core/generalService';
import { Query } from 'src/app/core/query';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-general-details-edit-relations',
  templateUrl: './general-edit-relations.component.html',
  styleUrls: ['./general-edit-relations.component.css']
})
export class GeneralEditRelationsComponent implements OnInit {

  @Input("items")

  public itemList: GeneralModelWithRouting[] = [];

  @Input("validItemsToAdd")
  public validItemsToAdd: GeneralModelWithRouting[] = [];

  @Input()
  public service?: GeneralService<GeneralModelWithRouting>;

  @Input()
  public defaultQuery?: Query;

  @Output("itemsToAdd")
  private output_itemsToAdd: EventEmitter<GeneralModelWithRouting[]> = new EventEmitter();
  public itemsToAdd: GeneralModelWithRouting[] = [];

  @Output("itemsToRemove")
  private output_itemsToRemove: EventEmitter<GeneralModelWithRouting[]> = new EventEmitter();
  public itemsToRemove: GeneralModelWithRouting[] = [];


  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit(): void {
  }

  public getColorOfChip(item: GeneralModelWithRouting): string|undefined
  {
    if(this.itemsToAdd.find(x => x.id == item.id))
      return "success";

    if(this.itemsToRemove.find(x => x.id == item.id))
      return "danger";
      
    return undefined;
  }

  addItem(event: GeneralModelWithRouting): void
  {
    this.toggleItem(event);
  }

  public toggleItem(item: GeneralModelWithRouting): void
  {
    let isInItemsToAdd = this.itemsToAdd.find((x => x.id == item.id));
    let isInItemsToRemove = this.itemsToRemove.find(x => x.id == item.id);
    let isInItemList = this.itemList.find(x => x.id == item.id);

    //case 1: item should be added to addList
    if(!isInItemsToAdd && !isInItemList)
    {
      this.itemsToAdd.push(item);
      this.itemList.push(item);
      this.output_itemsToAdd.emit(this.itemsToAdd);
    }

    //case 2: item should be removed from addList
    if(isInItemsToAdd && isInItemList)
    {
      this.itemsToAdd = this.itemsToAdd.filter(i => i.id != item.id);
      this.itemList = this.itemList.filter(i => i.id != item.id);
      this.output_itemsToAdd.emit(this.itemsToAdd);
    }

    //case 3: item should be added to removeList
    if(!isInItemsToRemove && isInItemList)
    {
      this.itemsToRemove.push(item);
      this.output_itemsToRemove.emit(this.itemsToRemove);
    }

    //case 4: item should be removed from removeList
    if(isInItemsToRemove && isInItemList)
    {
      this.itemsToRemove = this.itemsToRemove.filter(i => i.id != item.id);
      this.output_itemsToRemove.emit(this.itemsToRemove);
    }

  }
}
