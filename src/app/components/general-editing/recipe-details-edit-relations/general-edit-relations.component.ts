import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { GeneralService } from 'src/app/core/generalService';
import { Query } from 'src/app/core/query';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GeneralModel } from 'src/app/model/generalModel';

@Component({
  selector: 'app-general-details-edit-relations',
  templateUrl: './general-edit-relations.component.html',
  styleUrls: ['./general-edit-relations.component.css']
})
export class GeneralEditRelationsComponent implements OnInit {

  @Input("items")

  public itemList: GeneralModel[] = [];

  @Input("validItemsToAdd")
  public validItemsToAdd: GeneralModel[] = [];

  @Input()
  public service?: GeneralService<GeneralModel>;

  @Input()
  public defaultQuery?: Query;

  @Output("itemsToAdd")
  private output_itemsToAdd: EventEmitter<GeneralModel[]> = new EventEmitter();
  public itemsToAdd: GeneralModel[] = [];

  @Output("itemsToRemove")
  private output_itemsToRemove: EventEmitter<GeneralModel[]> = new EventEmitter();
  public itemsToRemove: GeneralModel[] = [];


  public getItemState(item: GeneralModel): string
  {
    if(this.itemsToAdd.includes(item)) return "success";
    if(this.itemsToRemove.includes(item)) return "danger";
    return this.settingsService.opposittheme;
  }

  constructor(
    public settingsService: SettingsService
  ) { }

  ngOnInit(): void {
  }


  addItem(event: GeneralModel): void
  {
    this.toggleItem(event);
  }

  public toggleItem(item: GeneralModel): void
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
