import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { GeneralAddComponent } from 'src/app/components/general-editing/general-add/general-add.component';
import { RecipeAddModalComponent } from 'src/app/components/recipe-components/recipe-add-modal/recipe-add-modal.component';
import { BranchService } from 'src/app/core/services/branch.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Query } from 'src/app/core/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.css']
})
export class RecipeOverviewComponent implements OnInit {

  public loading: Boolean = true;
  public recipeList: Recipe[] = [];

  constructor(
    public settingsService: SettingsService,
    public toastController: ToastController,
    public modalController: ModalController,
    public recipeService: RecipeService,
    public branchService: BranchService,
    public categoryService: CategoryService,
    public router: Router
  ) { }

  public async loadAll(){
    this.loading = true;
    let status = [false, true, true];

    this.branchService.getAll().then(() => status[1] = false)
    .catch(async (error) => {
      console.warn(error);
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
      status[1] = false;
      await toast.present();
    });

    this.categoryService.getAll().then(() => status[2] = false)
    .catch(async (error) => {
      console.warn(error);
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
      status[2] = false;
      await toast.present();
    });
    while(status.some((value) => value === true)) await new Promise(resolve => setTimeout(resolve, 100));
    if(status.every((value) => value === false)) this.loading = false;
  }

  async ngOnInit() {
    this.loadAll();
  }

  async onAddItem() {
    const modal = await this.modalController.create({
      component: RecipeAddModalComponent
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();
    if (data) {
      this.router.navigate(['/recipes', data.slug], {queryParams: {editMode: true} });
    }
  }


  public searchQuery: Query = new Query();

  public getByQuery(query: Query){
    this.searchQuery = query;
  }
  
}
