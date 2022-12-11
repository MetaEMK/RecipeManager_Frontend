import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BranchRoutingModule } from './branch-routing.module';
import { BranchEditComponent } from './branch-edit/branch-edit.component';
import { BranchOverviewComponent } from './branch-overview/branch-overview.component';

import { BranchAddComponent } from 'src/app/components/branch/branch-add/branch-add.component';
import { BranchNameEditComponent } from 'src/app/components/branch/branch-name-edit/branch-name-edit.component';
import { RecipeCardComponent } from 'src/app/components/recipe/recipe-card/recipe-card.component';
import { RecipeCardViewComponent } from 'src/app/components/recipe/recipe-card-view/recipe-card-view.component';
import { RecipeCardAddComponent } from 'src/app/components/recipe/recipe-card-add/recipe-card-add.component';


@NgModule({
  declarations: [
    BranchOverviewComponent,
    BranchEditComponent,
    BranchAddComponent,
    BranchNameEditComponent,
    RecipeCardComponent,
    RecipeCardViewComponent,
    RecipeCardAddComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    IonicModule.forRoot(
      {
        mode: 'ios'
      }
    ),
    FormsModule
  ]
})
export class BranchModule { }
