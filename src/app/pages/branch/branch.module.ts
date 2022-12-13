import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { BranchOverviewComponent } from './branch-overview/branch-overview.component';

import { BranchAddComponent } from 'src/app/components/branch/branch-add/branch-add.component';
import { RecipeModule } from '../recipe/recipe.module';
import { GeneralEditingModule } from 'src/app/components/general-editing/general-editing.module';
import { RecipeComponentsModule } from 'src/app/components/recipe-components/recipe-components.module';
import { FilteringModule } from 'src/app/components/filtering/filtering.module';


@NgModule({
  declarations: [
    BranchOverviewComponent,
    BranchEditComponent,
    BranchAddComponent,
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    IonicModule.forRoot(
      {
        mode: 'ios'
      }
    ),
    FormsModule,
    GeneralEditingModule,
    RecipeComponentsModule,
    FilteringModule
  ]
})
export class BranchModule { }
