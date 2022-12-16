import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariantService } from 'src/app/core/services/variant.service';
import { Size } from 'src/app/model/size.model';

@Component({
  selector: 'app-variant-add-modal',
  templateUrl: './variant-add-modal.component.html',
  styleUrls: ['./variant-add-modal.component.css']
})
export class VariantAddModalComponent {

  @Input()
  recipeId?: number;

  public itemName?: string;

  public itemDescription?: string;

  public itemSize?: Size;

  constructor(
    private modalController: ModalController,
    private variantService: VariantService,
  ) { }

  public onCancel() {
    this.modalController.dismiss(false);
  }

  public async onAddItem() {
    console.log(this.recipeId);
    if(this.recipeId && this.itemName && this.itemSize)
    {
      let item = await this.variantService.createVariant(this.recipeId ,this.itemName, this.itemSize.id, this.itemDescription);
      console.log(item);
      this.modalController.dismiss(true);
    }
  }

}
