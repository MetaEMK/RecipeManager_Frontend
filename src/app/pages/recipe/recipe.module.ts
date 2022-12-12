import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeCardAddComponent } from 'src/app/components/recipe/recipe-card-add/recipe-card-add.component';
import { RecipeCardComponent } from 'src/app/components/recipe/recipe-card/recipe-card.component';
import { RecipeCardViewComponent } from 'src/app/components/recipe/recipe-card-view/recipe-card-view.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ThemeService } from 'src/app/core/services/theme.service';


@NgModule({
  declarations: [
    RecipeCardComponent,
    RecipeCardAddComponent,
    RecipeCardViewComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    })
  ],
  providers: [
    ThemeService
  ],
  exports: [
    RecipeCardComponent,
    RecipeCardAddComponent,
    RecipeCardViewComponent
  ]
})
export class RecipeModule { }
