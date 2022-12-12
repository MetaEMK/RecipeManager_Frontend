import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { Router } from '@angular/router';
import { BranchService } from 'src/app/core/services/branch.service';
import { GeneralService } from 'src/app/core/services/generalService';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GeneralModel } from 'src/app/model/generalModel';

@Component({
  selector: 'app-name-edit',
  templateUrl: './name-edit.component.html',
  styleUrls: ['./name-edit.component.css']
})
export class NameEditComponent {

  @Input()
  public title!: string;
  
  @Input() 
  public item!: GeneralModel;

  @Input() 
  public editMode!: boolean;

  @Output()
  public changes = new EventEmitter<string|undefined>();

  public nameEdit: boolean = false;
  public newItemName?: string;
  public nameError?: string;
  public loading: boolean = false;

  constructor(
    public themeService: SettingsService,
    public router: Router,
  ) { }

  ngOnInit(): void {
      this.newItemName = this.item.name;
      this.editMode = false;
  }

  ngOnChanges(changes: any): void
  {
    if(!changes.editMode.currentValue){
      this.nameEdit = false;
      this.nameError = undefined;
      this.newItemName = this.item.name;
    }
  }

  public changeName(event: any){
    const val = event.detail.value
    this.newItemName = val;

    if(val === this.item.name)
      this.changes.emit(undefined);
    else
      this.changes.emit(this.newItemName)
  }
}
