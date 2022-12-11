import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { BranchRecipeAddComponent } from './components/branch/branch-recipe-add/branch-recipe-add.component';
import { RecipeCardComponent } from './components/recipe/recipe-card/recipe-card.component';
import { RecipeCardViewComponent } from './components/recipe/recipe-card-view/recipe-card-view.component';
import { RecipeCardAddComponent } from './components/recipe/recipe-card-add/recipe-card-add.component';

@NgModule({
  declarations: [
    AppComponent,
    BranchRecipeAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot(
      {
        mode: 'ios'
      }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
