import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { GeneralAddComponent } from 'src/app/components/general-editing/general-add/general-add.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { Query, QueryItem } from 'src/app/core/query';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.css', '../../../../theme/theme.css']
})
export class CategoryOverviewComponent implements OnInit {

  public filteredCategories: GeneralModelWithRouting[] = [];

  public loading: boolean = false;

  public filter?: string;

  public editMode: boolean = false;
  public newCategoryName: string|undefined;

  constructor(
    public toastController: ToastController,
    public categoryService: CategoryService,
    public router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.filter = undefined;
    this.categoryService.getAll().then((categories) => {
      this.filteredCategories = categories;
      this.loading = false;
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
      this.loading = false;
      await toast.present();
    });
  }

  public searchByQuery(queryValue: string){
    this.loading = true;
    const query = new Query(new QueryItem("name", [queryValue]));
    this.categoryService.getByQuery(query).then((categories) => {
      this.filteredCategories = categories;
      this.loading = false;

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
      this.loading = false;
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
