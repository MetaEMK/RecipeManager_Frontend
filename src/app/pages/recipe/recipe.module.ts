import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SettingsService } from 'src/app/core/services/settings.service';
import { RecipeOverviewComponent } from './recipe-overview/recipe-overview.component';
import { GeneralEditingModule } from 'src/app/components/general-editing/general-editing.module';
import { RecipeComponentsModule } from 'src/app/components/recipe-components/recipe-components.module';


@NgModule({
  declarations: [
    RecipeOverviewComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    GeneralEditingModule,
    RecipeComponentsModule
  ],
  providers: [
    SettingsService
  ]
})
export class RecipeModule { }
