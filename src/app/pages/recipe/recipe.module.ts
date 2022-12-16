import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecipeOverviewComponent } from './recipe-overview/recipe-overview.component';
import { GeneralEditingModule } from 'src/app/components/general-editing/general-editing.module';
import { RecipeComponentsModule } from 'src/app/components/recipe-components/recipe-components.module';
import { FilteringModule } from 'src/app/components/filtering/filtering.module';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { VariantComponentsModule } from 'src/app/components/variant-components/variant-components.module';


@NgModule({
  declarations: [
    RecipeOverviewComponent,
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    GeneralEditingModule,
    RecipeComponentsModule,
    FilteringModule,
    VariantComponentsModule
  ]
})
export class RecipeModule { }
