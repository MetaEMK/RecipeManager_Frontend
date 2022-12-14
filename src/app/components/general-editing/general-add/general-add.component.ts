import { Component, Input, OnInit, Output } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { GeneralService } from 'src/app/core/generalService';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-general-add',
  templateUrl: './general-add.component.html',
  styleUrls: ['./general-add.component.css']
})
export class GeneralAddComponent implements OnInit {

  public loading: Boolean = false;

  @Input()
  public title?: string;

  @Input()
  public description?: string;

  @Input()
  public service?: GeneralService<GeneralModelWithRouting>

  public itemName?: string;


  constructor(
    public settingsService: SettingsService,
    public toastController: ToastController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  public async onAddItem() {
    this.loading = true;
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
          this.loading = false;
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
        this.loading = false;
        await toast.present();
      }

    } catch (error) {
      let message: string = (error instanceof ApiError) ? (error as ApiError).messageForUser: "Es gab ein Fehler beim Hinzufügen";
      console.warn(error)
      toast = await this.toastController.create({
        position: 'top',
        color: 'danger',
        message: message,
        duration: 3000
      });

      this.loading = false;
      await toast.present();
    }
      
  }

  onCancel() {
    this.modalController.dismiss(undefined);
  }

}
