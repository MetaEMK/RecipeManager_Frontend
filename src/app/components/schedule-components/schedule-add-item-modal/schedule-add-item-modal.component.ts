import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Query, QueryItem } from 'src/app/core/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { ScheduleService } from 'src/app/core/services/schedule.service';
import { VariantService } from 'src/app/core/services/variant.service';
import { Branch } from 'src/app/model/branch.model';
import { Recipe } from 'src/app/model/recipe.model';
import { Size } from 'src/app/model/size.model';
import { Variant } from 'src/app/model/variant.model';

@Component({
  selector: 'app-schedule-add-item-modal',
  templateUrl: './schedule-add-item-modal.component.html',
  styleUrls: ['./schedule-add-item-modal.component.css']
})
export class ScheduleAddItemModalComponent implements OnInit {

  //Inputet from parent by modal
  public branch!: Branch;
  public day!: number;

  public selectedRecipe? : Recipe;
  public variantList: Variant[] = [];
  public selectedVariant? : Variant;
  public selectedSize?: Size;
  public selectedQuantity?: number;

  public defaultQuery: Query = new Query();

  constructor(
    public recipeService: RecipeService,
    public modalController: ModalController,
    private toastController: ToastController,
    private variantService: VariantService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.defaultQuery = new Query(new QueryItem("branch", [this.branch.id.toString()]));
  }

  public async onSelectedItem(item: any): Promise<void>
  {
    this.selectedRecipe = item;
    try {
      if(this.selectedRecipe)
      {
        this.variantList = await this.variantService.getVariantsForRecipe(this.selectedRecipe.id);
      }
    } catch (error) {
      
    }
  }

  public onSelectedVariant(item: any): void
  {
    this.selectedVariant = item;
  }

  public onSelectedSize(item: any): void
  {
    this.selectedSize = item;
  }

  async onSelectedQuantity(item: any): Promise<void>
  {
    const input = item.detail.value;
    if(!Number.isNaN(+input))
      this.selectedQuantity = Number(input);
  }

  public onCancel(): void
  {
    this.modalController.dismiss(false);
  }

  public async onAddItem(): Promise<void>
  {
    let toast: any;
    if(this.selectedRecipe && this.selectedVariant && this.selectedSize && this.selectedQuantity && this.day && this.branch)
    {
      try{
        await this.scheduleService.createSchuleItem(this.branch.id, this.day, this.selectedVariant.id, this.selectedSize.id, this.selectedQuantity);
        toast = await this.toastController.create({
          position: 'top',
          color: 'success',
          duration: 3000,
          message: 'Erfolgreich hinzugefügt'
        });

        this.modalController.dismiss(true);
      }
      catch(error: any)
      {
        toast = await this.toastController.create({
          position: 'top',
          color: 'danger',
          duration: 3000,
          message: error.message
        });
        this.modalController.dismiss(false);
      }
      await toast.present();
    }
    else
    {
      const toast = await this.toastController.create({
        position: 'top',
        color: 'warning',
        duration: 3000,
        message: 'Bitte die Eingaben überprüfen. Alle Felder müssen korrekt ausgefüllt sein.'
      });
      await toast.present();
    }
  }
}
