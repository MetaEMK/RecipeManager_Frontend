import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './recipe-card/recipe-card.component';
import { RecipeCardAddComponent } from './recipe-card-add/recipe-card-add.component';
import { RecipeCardViewComponent } from './recipe-card-view/recipe-card-view.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeneralEditingModule } from '../general-editing/general-editing.module';



@NgModule({
  declarations: [
    RecipeCardComponent,
    RecipeCardAddComponent,
    RecipeCardViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    })
  ],
  exports: [
    RecipeCardComponent,
    RecipeCardAddComponent,
    RecipeCardViewComponent
  ]
})
export class RecipeComponentsModule { }
