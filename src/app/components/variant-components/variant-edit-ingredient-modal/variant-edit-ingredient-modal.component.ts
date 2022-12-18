import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ingredient } from 'src/app/model/ingredient.model';

@Component({
  selector: 'app-variant-edit-ingredient-modal',
  templateUrl: './variant-edit-ingredient-modal.component.html',
  styleUrls: ['./variant-edit-ingredient-modal.component.css']
})
export class VariantEditIngredientModalComponent implements OnInit {

  
  @Input("ingredient")
  public ingredient?: Ingredient;

  @Input("alreadyUsedIngredients")
  public alreadyUsedIngredients: Ingredient[] = [];

  public name: string = "";
  public quantity: string = "0";
  public unit: string = "";

  public quantityErrorValue? : string;
  public nameErrorValue? : string;
  public unitErrorValue? : string;

  constructor(
    public modalController: ModalController
  ) {
  }

  ngOnInit(): void {
    if(this.ingredient){
      this.alreadyUsedIngredients = this.alreadyUsedIngredients.filter(x => x.name != this.ingredient?.name);
      this.name = this.ingredient.name;
      this.quantity = this.ingredient.quantity.toString();
      this.unit = this.ingredient.unit;
    }
  }

  public onCancel()
  {
    this.modalController.dismiss(undefined);
  }

  public checkName()
  {
    this.nameErrorValue = undefined;

    if(this.name.length == 0)
      this.nameErrorValue = "Der Name darf nicht leer sein!";

    if(this.alreadyUsedIngredients.find(x => x.name == this.name))
      this.nameErrorValue = "Der Name ist bereits vergeben!";
  }

  public checkQuantity()
  {
    this.quantityErrorValue = undefined;

    if(this.quantity === "")
      this.quantityErrorValue = "Die Anzahl darf nicht leer sein!";

    if(Number.isNaN(+this.quantity) || +this.quantity <= 0)
      this.quantityErrorValue = "Die Anzahl muss eine positive Zahl sein!";

  }
  public checkUnit()
  {
    if(this.unit.length == 0)
      this.unitErrorValue = "Die Einheit darf nicht leer sein!";
    else
      this.unitErrorValue = undefined;
  }

  public onSave()
  {
    this.checkName();
    this.checkQuantity();
    this.checkUnit();

    if(!this.nameErrorValue && !this.quantityErrorValue && !this.unitErrorValue)
      this.modalController.dismiss({
        name: this.name,
        quantity: this.quantity,
        unit: this.unit,
        order: this.ingredient?.order ?? 0,
      },
      this.ingredient ? "update" : "create");
  }

}
