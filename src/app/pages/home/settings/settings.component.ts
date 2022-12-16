import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ConversionTypesService } from 'src/app/core/services/conversion-types.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { SizeService } from 'src/app/core/services/size.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {


  constructor(
    public settingsService: SettingsService,
    private conversionTypeService: ConversionTypesService,
    private toastController: ToastController,
    private sizeService: SizeService
    ) { }

  public changeTheme(): void {
  }

  public async addDefaultConversionTypes(): Promise<void> {
    let toast;

    try
    {
      
      const all = await this.conversionTypeService.getAll();

      for (let index = 0; index < all.length; index++) {
        const conType = all[index];
        const allSizes = await this.sizeService.getAll(conType.id);

        for (let i = 0; i < allSizes.length; i++) {
          const size = allSizes[i];
          await this.sizeService.delete(conType.id, size.id);
        }
        
        await this.conversionTypeService.delete(conType.id);
      }
      const rund = await this.conversionTypeService.create('Rund');
      const eckig = await this.conversionTypeService.create('Rechteckig');

      await this.sizeService.create(rund.id, "16cm");
      await this.sizeService.create(rund.id, "18cm");
      await this.sizeService.create(rund.id, "20cm");

      await this.sizeService.create(eckig.id, "20x40cm");
      await this.sizeService.create(eckig.id, "20x60cm");
      await this.sizeService.create(eckig.id, "20x80cm");


      toast = await this.toastController.create({
        position: 'top',
        message: 'Standardkonvertierungstypen wurden hinzugefügt',
        duration: 3000,
        color: 'success'
      });
    }

    catch (error: any) {
      console.error(error);
      toast = await this.toastController.create({
        position: 'top',
        message: error.message,
        duration: 3000,
        color: 'danger'
      });    

      await toast.present();
    }
  }

}
