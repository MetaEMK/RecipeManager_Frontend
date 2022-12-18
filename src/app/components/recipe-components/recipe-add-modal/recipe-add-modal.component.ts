import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { RecipeService } from 'src/app/core/services/recipe.service';

@Component({
  selector: 'app-recipe-add-modal',
  templateUrl: './recipe-add-modal.component.html',
  styleUrls: ['./recipe-add-modal.component.css']
})
export class RecipeAddModalComponent {

  
  public itemName: string = '';
  public itemDescription?: string;
  private testImage: any;
  public imagePath: any;


  constructor(
    public recipeService: RecipeService,
    private toastController: ToastController,
    private modalController: ModalController
  ) { }

    public onAddItem() {
      this.recipeService.create(this.itemName, this.itemDescription, this.testImage).then(async (recipe) => {
        const toast = await this.toastController.create({
          message: `Rezept ${recipe.name} wurde erstellt.`,
          duration: 3000,
          position: 'top',
          color: 'success'
        });
        await toast.present();
        await this.modalController.dismiss(recipe);
      })
      .catch(async (error: any) => {
        console.warn(error.message);
        const toast = await this.toastController.create({
          message: `Rezept konnte nicht erstellt werden: ${error.message}`,
          duration: 3000,
          position: 'top',
          color: 'danger'
          });
          await toast.present();
      });
    }
    uploadImage(event: any) {
      this.testImage = event.target.files[0];
      this.imagePath = this.testImage;
    }

    public async onCancel()
    {
      await this.modalController.dismiss();
    }
}
