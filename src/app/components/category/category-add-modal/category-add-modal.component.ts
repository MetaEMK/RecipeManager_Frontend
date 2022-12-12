import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoryService } from 'src/app/core/services/category.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';

@Component({
  selector: 'app-category-add-modal',
  templateUrl: './category-add-modal.component.html',
  styleUrls: ['./category-add-modal.component.css']
})
export class CategoryAddModalComponent {

  public newCategoryName?: string;
  public loading: boolean = false;

  constructor(
    public themeService: SettingsService,
    public categoryService: CategoryService,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
  ) { }

  ngOnInit(): void
  {
  }

  public async addCategory()
  {
    let toast;
    if (this.newCategoryName){
      try
      {
        await this.categoryService.create(this.newCategoryName);
        toast = await this.toastCtrl.create({
          position: 'top',
          message: 'Category erfolgreich hinzugefügt',
          duration: 2000,
          color: 'success'
        });
        this.modalCtrl.dismiss();
      } catch (err)
      {
        const error = err as ApiError;
        console.log(error.messageForUser);

        toast = await this.toastCtrl.create({
          position: 'top',
          message: error.messageForUser,
          duration: 2000,
          color: 'danger'
        });
      }
      await toast.present();
    }
  }
}
