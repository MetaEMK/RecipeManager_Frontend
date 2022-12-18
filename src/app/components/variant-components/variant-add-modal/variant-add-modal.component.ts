import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { VariantService } from 'src/app/core/services/variant.service';
import { ConversionTypes } from 'src/app/model/conversion-types.model';
import { Size } from 'src/app/model/size.model';

@Component({
  selector: 'app-variant-add-modal',
  templateUrl: './variant-add-modal.component.html',
  styleUrls: ['./variant-add-modal.component.css',]
})
export class VariantAddModalComponent {

  @Input()
  recipeId?: number;

  public itemName?: string;

  public itemDescription?: string;

  public itemSize?: Size;

  public itemConversionType?: ConversionTypes

  constructor(
    private modalController: ModalController,
    private variantService: VariantService,
    public toastController: ToastController,
  ) { }

  public onCancel() {
    this.modalController.dismiss(false);
  }

  public async onAddItem() {
    if(this.recipeId && this.itemName && this.itemSize && this.itemConversionType)
    {
      try {
        await this.variantService.createVariant(this.recipeId ,this.itemName, this.itemConversionType.id, this.itemSize.id, this.itemDescription);
        
        const toast = await this.toastController.create({
          message: 'Variante hinzugefügt',
          position: 'top',
          duration: 3000,
          color: 'success',
        });
        await toast.present();

        this.modalController.dismiss(true);
      } catch (error: any) {

        const toast = await this.toastController.create({
          message: error.message,
          position: 'top',
          duration: 3000,
          color: 'danger',
        });

        await toast.present();
      }
    }
    else
    {
      const toast = await this.toastController.create({
        message: 'Bitte fülle alle korrekt Felder aus',
        position: 'top',
        duration: 3000,
        color: 'danger',
      });

      await toast.present();
    }
  }

}
