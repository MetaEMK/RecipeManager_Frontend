import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRoutingModule } from './category-routing.module';

import { GeneralEditingModule } from 'src/app/components/general-editing/general-editing.module';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CategoryAddModalComponent } from 'src/app/components/category/category-add-modal/category-add-modal.component';
import { CategoryOverviewComponent } from './category-overview/category-overview.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { RecipeComponentsModule } from 'src/app/components/recipe-components/recipe-components.module';
import { FilteringModule } from 'src/app/components/filtering/filtering.module';


@NgModule({
  declarations: [
    CategoryAddModalComponent,
    CategoryOverviewComponent,
    CategoryDetailsComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    IonicModule.forRoot({
      mode: 'ios'
    }),
    FormsModule,
    GeneralEditingModule,
    RecipeComponentsModule,
    FilteringModule
  ],
  providers: []
})
export class CategoryModule { }
