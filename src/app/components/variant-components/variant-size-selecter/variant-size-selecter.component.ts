import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Query } from 'src/app/core/query';
import { ConversionTypesService } from 'src/app/core/services/conversion-types.service';
import { ConversionService } from 'src/app/core/services/conversion.service';
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
    private converSionService: ConversionService,
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getConversionTypes();

    if (this.conversionType && !this.fromSize) 
      await this.getSizes(this.conversionType);

    if(this.conversionType && this.fromSize)
    {
      let query = new Query();
      query.add("fromSize", this.fromSize.id.toString());

      const conversions = await this.converSionService.getConversion(this.conversionType, query);
      
      this.sizes = [this.fromSize];
      conversions.forEach(x => this.sizes.push(x.toSize));

      if(this.size)
      await this.selectSize({detail: {value: this.size.id}});
    }
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
    this.conversionType = conversionType;
    this.output_selectedConversionType.emit(conversionType);
    
    if(conversionType)
      await this.getSizes(conversionType);
  }

  public async selectSize(event: any): Promise<void> {
    const selectedSize = this.sizes.find(x => x.id === event.detail.value);
    this.selectedSize = selectedSize;
    this.output_selectedSize.emit(selectedSize);

    if(this.fromSize && selectedSize)
    {
      if(this.fromSize.id === selectedSize.id)
        this.output_multiplicator.emit(1);
      else
      {
        if(this.conversionType && this.fromSize && selectedSize)
        {
          let query = new Query();
          query.add("fromSize", this.fromSize.id.toString());
          query.add("toSize", selectedSize.id.toString());
          let data = await this.converSionService.getConversion(this.conversionType, query);;
          this.output_multiplicator.emit(data[0].multiplicator);
        }
      }
    }
  }
}
