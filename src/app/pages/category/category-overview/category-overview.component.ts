import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoryAddModalComponent } from 'src/app/components/category/category-add-modal/category-add-modal.component';
import { GeneralAddComponent } from 'src/app/components/general-editing/general-add/general-add.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { Query } from 'src/app/core/services/query';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Category } from 'src/app/model/category.model';
import { GeneralModel } from 'src/app/model/generalModel';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.css']
})
export class CategoryOverviewComponent implements OnInit {

  public filteredCategories: GeneralModel[] = [];

  public filter?: string;

  public editMode: boolean = false;
  public newCategoryName: string|undefined;

  constructor(
    public themeService: SettingsService,
    public toastController: ToastController,
    public categoryService: CategoryService,
    public router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.filter = undefined;
    this.categoryService.getAll().then((categories) => {
      this.filteredCategories = categories;
    })
    .catch(async (error) => {
      console.log(error);
      const toast = await this.toastController.create({
        position: "top",
        message: error.messageForUser,
        color: "danger",
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
        ]
      });
      await toast.present();
    });
  }

  public searchByQuery(query: Query){
    this.categoryService.getByQuery(query).then((categories) => {
      this.filteredCategories = categories;
    }).catch(async (error) => {
      console.log(error);
      const toast = await this.toastController.create({
        position: "top",
        message: error.messageForUser,
        color: "danger",
        buttons: [
          {
            text: 'OK',
            role: 'cancel'
          },
        ]
      });
      await toast.present();
    });
  }

  public async openAddModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: GeneralAddComponent,
      componentProps: {
        title: 'Kategorie',
        description: 'Bitte einen Kategorienamen eingeben',
        service: this.categoryService
      }
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if(data) {
      this.ngOnInit();
    }
  }
}
