import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ingredient } from 'src/app/model/ingredient.model';
import { VariantEditIngredientModalComponent } from '../variant-edit-ingredient-modal/variant-edit-ingredient-modal.component';

@Component({
  selector: 'app-variant-section',
  templateUrl: './variant-section.component.html',
  styleUrls: ['./variant-section.component.css']
})
export class VariantSectionComponent implements OnInit {

  @Input("testSectionNumber")
  public title: string = "";

  @Input("sectionId")
  public sectionId: number = 0;

  @Input()
  public editMode: boolean = false;

  @Input()
  public ingredients: Ingredient[] = [];

  @Input()
  public multiplicator: number = 1;

  @Output("newIngredients")
  public output_ingredients: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();


  public newIngredientName: string = "";

  private maxNumber: number = -1;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit(): void {
    if(this.ingredients.length > 0)
    {
      this.ingredients = this.ingredients.sort((a,b) => {return a.order - b.order});
      let t: Ingredient[] = [];
      this.ingredients.forEach((x, index) => {
        x.order = index;
        t.push(x);
      });
      this.ingredients = t;
      this.maxNumber = Math.max(...this.ingredients.map(x => x.order));
      this.output_ingredients.emit(this.ingredients);
    }
  }

  doReorder(ev: any) {
    ev.stopPropagation();
    console.log(ev.detail);
    if(!this.ingredients)
      return;

      let draggedItem = this.ingredients[ev.detail.from];
      let targetItem = this.ingredients[ev.detail.to];

      if(draggedItem && targetItem)
      {
      draggedItem.order = ev.detail.to;
      targetItem.order = ev.detail.from;
      }
    else console.log("Error: Could not find dragged or target item!");

    
    ev.detail.complete();
    this.ingredients = this.ingredients.sort((a,b) => {return a.order - b.order});
    this.output_ingredients.emit(this.ingredients);

  }

  public async openAddIngredientModal(item?: Ingredient) {
    if(this.editMode)
    {

    
      let addModal = await this.modalController.create({
        component: VariantEditIngredientModalComponent,
        componentProps: {
          ingredient: item,
          alreadyUsedIngredients: this.ingredients
        }
      });

      await addModal.present();

      let result = await addModal.onDidDismiss();
      switch(result.role)
      {
        case "create":
          if(!this.ingredients)
            this.ingredients = [];

          const newIng: Ingredient = {
            name: result.data.name,
            quantity: Number(result.data.quantity),
            unit: result.data.unit,
            section: this.sectionId,
            order: ++this.maxNumber
          }
          this.ingredients.push(newIng);
        break;

        case "update":
          let old = this.ingredients?.find(x => x.order == result.data.order);
          if(old)
          {
            old.name = result.data.name;
            old.quantity = Number(result.data.quantity);
            old.unit = result.data.unit;
          }
          else
            console.error("Could not find ingredient to update!");
        break;
        default:
          console.log("No action taken: " + result.role);
        break;
      }
    }
    this.ingredients = this.ingredients.sort((a,b) =>{ return a.order - b.order});
    this.output_ingredients.emit(this.ingredients);
  }

  public deleteIngredient(item: Ingredient) {
    let newIngredients: Ingredient[] = [];
    let isDeleted = false;
    this.ingredients.forEach(x => {
      if(isDeleted && x.name !== item.name)
      {
        x.order--;
        newIngredients.push(x);
      }

      if(!isDeleted && x.name !== item.name)
        newIngredients.push(x);

      if(x.name === item.name)
        isDeleted = true;
    });
    this.ingredients = newIngredients;
  }
}
