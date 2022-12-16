import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ConversionTypesService } from 'src/app/core/services/conversion-types.service';
import { SizeService } from 'src/app/core/services/size.service';
import { ConversionTypes as ConversionType } from 'src/app/model/conversion-types.model';
import { Size } from 'src/app/model/size.model';

@Component({
  selector: 'app-variant-size-selecter',
  templateUrl: './variant-size-selecter.component.html',
  styleUrls: ['./variant-size-selecter.component.css']
})
export class VariantSizeSelecterComponent implements OnInit {

  @Input()
  public showConversionType?: boolean = true;

  @Input()
  public allowChangesToConversionType?: boolean = true;

  @Input()
  public showSize?: boolean = true;

  @Input()
  public allowChangesToSize?: boolean = true;


  @Input()
  public fromSize?: Size;

  @Input("preSelectedConversionType")
  public conversionType?: ConversionType;

  @Input("preSelectedSize")
  public size?: Size;


  @Output("selectedConversionType")
  private output_selectedConversionType: EventEmitter<ConversionType> = new EventEmitter<ConversionType>();
  public selectedConversionSize?: ConversionType;

  @Output("selectedSize")
  private output_selectedSize: EventEmitter<Size> = new EventEmitter<Size>();
  public selectedSize?: Size;

  @Output("multiplicator")
  private output_multiplicator: EventEmitter<number> = new EventEmitter<number>();

  public conversionTypes: ConversionType[] = []
  public sizes: Size[] = []

  constructor(
    private conversionTypeService: ConversionTypesService,
    private sizeService: SizeService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getConversionTypes();

    if (this.conversionType) 
      await this.getSizes(this.conversionType);
  }

  public async getConversionTypes(): Promise<void> {
    try {
      this.conversionTypes = await this.conversionTypeService.getAll();
    } catch (error) {
      console.error(error);
    }
  }

  public async getSizes(conversionType: ConversionType): Promise<void> {
    try {
      this.sizes = await this.sizeService.getAll(conversionType.id);
    } catch (error) {
      console.error(error);
    }
  }

  public async selectType(event: any): Promise<void> {
    const conversionType = this.conversionTypes.find(x => x.id === event.detail.value);
    this.selectedConversionSize = conversionType;
    this.output_selectedConversionType.emit(conversionType);
    
    if(conversionType)
      await this.getSizes(conversionType);
  }

  public selectSize(event: any): void {
    const size = this.sizes.find(x => x.id === event.detail.value);
    this.selectedSize = size;
    this.output_selectedSize.emit(size);

    if(this.fromSize && size)
    {
      if(this.fromSize.id === size.id)
        this.output_multiplicator.emit(1);
      else
        this.output_multiplicator.emit(2.5);
    }
  }
}
