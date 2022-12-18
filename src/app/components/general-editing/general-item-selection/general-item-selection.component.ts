import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GeneralService } from 'src/app/core/generalService';
import { Query } from 'src/app/core/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { ApiError } from 'src/app/model/apierror.model';
import { GeneralModelWithRouting } from 'src/app/model/generalModel';

@Component({
  selector: 'app-general-item-selection',
  templateUrl: './general-item-selection.component.html',
  styleUrls: ['./general-item-selection.component.css']
})
export class GeneralItemSelectionComponent  implements OnInit {
  
  @Input()
  public cardTitle = "Item auswählen";

  @Input()
  public searchLabel = "Suche";

  @Input()
  public searchPlaceholder = "Suche";

  @Input("service")
  public service?: GeneralService<GeneralModelWithRouting>;

  @Input("defaultQuery")
  public defaultQuery?: Query;

  @Input("minimumCharacters")
  public minimumCharacters: number = 3;

  @Input("alreadySelectedItems")
  public alreadySelectedItems: GeneralModelWithRouting[] = [];

  @Output("itemSelected")
  private output_itemSelected: EventEmitter<GeneralModelWithRouting> = new EventEmitter();

  public filteredItems: GeneralModelWithRouting[] = [];

  public loading: boolean = false;

  constructor(
    public settingsService: SettingsService,
    private toastController: ToastController
   ) { }

  ngOnInit(): void {
  }


  public async getItemsByQuery(nameQueryValue: string): Promise<void>
  {
    if (this.service == null  || this.defaultQuery == null || !nameQueryValue)
      return;

    this.loading = true;
    let searchQuery: Query = new Query();
    searchQuery.add("name", nameQueryValue);
    searchQuery.addQueryItems(this.defaultQuery.items);

    try {
      let items = await this.service.getByQuery(searchQuery);
      this.filteredItems = items.filter(i => !this.alreadySelectedItems.find(a => a.id === i.id));
      this.loading = false;
    } catch (error) {
      if(error instanceof ApiError)
      {
        const toast = await this.toastController.create({
          position: 'top',
          color: 'danger',
          message: error.message,
          duration: 2000
        });

        await toast.present();
      }
      console.warn("Error in GeneralItemSelectionComponent.getItemsByQuery");
      console.warn(error);
    }
  }

  public selectItem(item: GeneralModelWithRouting): void
  {
    this.filteredItems = this.filteredItems.filter(i => i.id != item.id);
    this.output_itemSelected.emit(item);
  }
}
