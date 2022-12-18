import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-name-edit',
  templateUrl: './name-edit.component.html',
  styleUrls: ['./name-edit.component.css' , '../../../../theme/theme.css']
})
export class NameEditComponent {

  @Input()
  public title!: string;
  
  @Input() 
  public item!: GeneralModelWithRouting;

  @Input() 
  public editMode!: boolean;

  @Output()
  public changes = new EventEmitter<string|undefined>();

  public nameEdit: boolean = false;
  public newItemName?: string;
  public nameError?: string;
  public loading: boolean = false;

  constructor( ) { }

  ngOnInit(): void {
      this.newItemName = this.item.name;
  }

  ngOnChanges(changes: any): void
  {
    if(!changes.editMode?.currentValue){
      this.nameEdit = false;
      this.nameError = undefined;
      this.newItemName = this.item.name;
    }
  }

  public changeName(event: any){
    this.newItemName = event.detail.value;
    if(this.newItemName === this.item.name)
      this.changes.emit(undefined);
    else
      this.changes.emit(this.newItemName)
  }
}
