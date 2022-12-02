import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BranchRoutingModule } from './branch-routing.module';
import { Category, categories } from 'src/test';
import { Recipe, recipes } from 'src/test';
import { ThemeServiceService } from 'src/app/core/services/theme-service.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BranchRoutingModule
  ]
})
export class BranchModule{

 }
