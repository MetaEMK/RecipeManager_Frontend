import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeCardAddComponent } from './recipe-card-add/recipe-card-add.component';
import { RecipeCardViewComponent } from './recipe-card-view/recipe-card-view.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralEditingModule } from '../general-editing/general-editing.module';
import { RecipeAddModalComponent } from './recipe-add-modal/recipe-add-modal.component';



@NgModule({
  declarations: [
    RecipeCardComponent,
    RecipeCardAddComponent,
    RecipeCardViewComponent,
    RecipeAddModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    GeneralEditingModule,
    NgOptimizedImage
  ],
  exports: [
    RecipeCardComponent,
    RecipeCardAddComponent,
    RecipeCardViewComponent,
    RecipeAddModalComponent,
    
  ]
})
export class RecipeComponentsModule { }
