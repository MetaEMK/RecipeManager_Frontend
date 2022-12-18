import { Component, EventEmitter, Input, OnChanges, OnInit, Output  } from '@angular/core';
import { GeneralService } from 'src/app/core/generalService';
import { Query } from 'src/app/core/query';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-general-details-edit-relations',
  templateUrl: './general-edit-relations.component.html',
  styleUrls: ['./general-edit-relations.component.css']
})
export class GeneralEditRelationsComponent implements OnInit, OnChanges {

  @Input("items")
  public itemList: GeneralModelWithRouting[] = [];
  private oldItemList: GeneralModelWithRouting[] = [];

  @Input()
  public editMode: boolean = true;

  @Input()
  public service?: GeneralService<GeneralModelWithRouting>;

  @Input()
  public defaultQuery?: Query;

  @Input()
  public cardTitle: string = "Relation hinzufügen";

  @Input()
  public searchLabel: string = "Suche";

  @Input()
  public searchPlaceholder: string = "Suche";

  @Output("itemsToAdd")
  private output_itemsToAdd: EventEmitter<GeneralModelWithRouting[]> = new EventEmitter();
  public itemsToAdd: GeneralModelWithRouting[] = [];

  @Output("itemsToRemove")
  private output_itemsToRemove: EventEmitter<GeneralModelWithRouting[]> = new EventEmitter();
  public itemsToRemove: GeneralModelWithRouting[] = [];


  constructor(
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(event: any): void
  {
    if(event.editMode?.currentValue == false)
    {
      this.itemsToAdd.forEach(x => this.itemList = this.itemList.filter(y => y.id != x.id));
      this.itemsToAdd = [];
      this.itemsToRemove = [];
      this.output_itemsToAdd.emit(this.itemsToAdd);
      this.output_itemsToRemove.emit(this.itemsToRemove);
    }
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
    if(!this.editMode) return;
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
