import { Component, Input } from '@angular/core';
import { Size } from 'src/app/model/size.model';
import { Variant } from 'src/app/model/variant.model';

@Component({
  selector: 'app-variant-card',
  templateUrl: './variant-card.component.html',
  styleUrls: ['./variant-card.component.css' , '../../../../theme/theme.css']
})
export class VariantCardComponent {

  @Input()
  public variant!: Variant;

  public selectedToSize?: Size;

  constructor(
  ) { }


  //TODO: Hier der emit für den Warenkorb später
  public onSelectedToSizeChange(size: Size) {
    this.selectedToSize = size;
  }

}
