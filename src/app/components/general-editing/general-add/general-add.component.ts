import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { GeneralService } from 'src/app/core/services/generalService';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { GeneralModel } from 'src/app/model/generalModel';

@Component({
  selector: 'app-general-add',
  templateUrl: './general-add.component.html',
  styleUrls: ['./general-add.component.css']
})
export class GeneralAddComponent implements OnInit {

  @Input()
  public title?: string;

  @Input()
  public description?: string;

  @Input()
  public service?: GeneralService<GeneralModel>

  public itemName?: string;


  constructor(
    public settingsService: SettingsService,
    public toastController: ToastController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    console.log(this.title)
  }

  public async onAddItem() {
    let toast;
    let item;

    try {
      if(this.itemName) {
        item = await this.service?.create(this.itemName);
        toast = await this.toastController.create({
          position: 'top',
          color: 'success',
          message: 'Erfolgreich hinzugefügt',
          duration: 3000
        });
        
        if(item) 
        {
          this.modalController.dismiss(item);
          await toast.present();
        }
      }
      else
      {
        toast = await this.toastController.create({
          position: 'top',
          color: 'danger',
          message: 'Bitte einen Namen eingeben',
          duration: 3000
        });
        await toast.present();
      }

    } catch (error) {
      console.warn(error)
      toast = await this.toastController.create({
        position: 'top',
        color: 'danger',
        message: 'Fehler beim Hinzufügen',
        duration: 3000
      });

      await toast.present();
    }
      
  }

  onCancel() {
    this.modalController.dismiss(undefined);
  }

}
