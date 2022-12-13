import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { GeneralAddComponent } from 'src/app/components/general-editing/general-add/general-add.component';
import { RecipeAddModalComponent } from 'src/app/components/recipe-components/recipe-add-modal/recipe-add-modal.component';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';

@Component({
  selector: 'app-recipe-overview',
  templateUrl: './recipe-overview.component.html',
  styleUrls: ['./recipe-overview.component.css']
})
export class RecipeOverviewComponent implements OnInit {

  constructor(
    public settingsService: SettingsService,
    public toastController: ToastController,
    public modalController: ModalController,
    public recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.recipeService.getAll();
  }

  async onAddItem() {
    const modal = await this.modalController.create({
      component: RecipeAddModalComponent
  });

  await modal.present();

  const { data } = await modal.onDidDismiss();
    if (data) {
      this.recipeService.getAll();
    }
  }
  
}
