import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { CategoryAddModalComponent } from 'src/app/components/category/category-add-modal/category-add-modal.component';
import { CategoryService } from 'src/app/core/services/category.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { Category } from 'src/app/model/category.model';

@Component({
  selector: 'app-category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.css']
})
export class CategoryOverviewComponent implements OnInit {

  public filteredCategories: Category[] = [];

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
    this.categoryService.getAll().then((categories) => {
      this.filteredCategories = categories;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  public filterCategories(event: any): void {
    this.filter = event.target.value;
    if(!this.filter) {
      this.filteredCategories = this.categoryService.categories;
      return;
    }
    else 
    {
      this.filteredCategories = this.categoryService.categories.filter((category) => {
        return category.name.toLowerCase().includes(this.filter!.toLowerCase());
      });
    }
  }

  public async openAddModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: CategoryAddModalComponent,
    });

    await modal.present();
  }

}
