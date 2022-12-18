import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConversionTypes } from 'src/app/model/conversion-types.model';
import { Size } from 'src/app/model/size.model';

@Component({
  selector: 'app-general-edit-master-data',
  templateUrl: './general-edit-master-data.component.html',
  styleUrls: ['./general-edit-master-data.component.css']
})
export class GeneralEditMasterDataComponent implements OnInit {

  @Input()
  public title: string = "";

  @Input()
  public editMode: boolean = false;

  @Input()
  public enableNameEdit: boolean = false;

  @Input()
  public enableDescriptionEdit: boolean = false;

  
  @Input()
  public enableSizeEdit: boolean = false;
  
  
  @Input()
  public name: string = "";
  
  @Input()
  public description: string = "";
  
  @Input()
  public conversionType?: ConversionTypes;
  @Input()
  public size?: Size;


  @Output("nameChanged")
  private output_name: EventEmitter<string> = new EventEmitter<string>();
  public editedName: string = "";

  @Output("descriptionChanged")
  private output_description: EventEmitter<string|null> = new EventEmitter<string|null>();
  public editedDescription: string|null = "";

  @Output("sizeChanged")
  private output_size: EventEmitter<Size> = new EventEmitter<Size>();
  public editedSize?: Size;


  constructor() { }

  ngOnInit(): void {
    if(this.enableNameEdit)
      this.editedName = this.name;

    if(this.enableDescriptionEdit)
      this.editedDescription = this.description;
  }


  public onNameChange(event: any) {
    this.editedName = event.detail.value;

    if(this.editedName !== undefined && this.editedName !== null && this.editedName !== "")
    {
      if(this.editedName !== this.name)
        this.output_name.emit(this.editedName);
      else
        this.output_name.emit(undefined);
    }
  }

  public onDescriptionChange(event: any) {
    this.editedDescription = event.detail.value;

    if(this.editedDescription !== this.description)
      this.output_description.emit(this.editedDescription);
    else if(this.editedDescription === "")
      this.output_description.emit(null);
    else
      this.output_description.emit(undefined);
  }

  public onSizeChange(event: Size) {
    this.editedSize = event;

    if(this.editedSize !== this.size)
      this.output_size.emit(this.editedSize);
    else
      this.output_size.emit(undefined);
  }
}
