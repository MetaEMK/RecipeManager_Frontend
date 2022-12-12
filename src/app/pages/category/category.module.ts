import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';

import { GeneralEditingModule } from 'src/app/components/general-editing/general-editing.module';
import { RecipeModule } from '../recipe/recipe.module';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CategoryAddModalComponent } from 'src/app/components/category/category-add-modal/category-add-modal.component';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';


@NgModule({
  declarations: [
    CategoryAddModalComponent,
    CategoryOverviewComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    RecipeModule,
    CategoryRoutingModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    FormsModule,
    GeneralEditingModule
  ],
  providers: []
})
export class CategoryModule { }
