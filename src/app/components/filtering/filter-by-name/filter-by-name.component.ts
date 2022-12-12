import { Component, Input, Output } from '@angular/core';
import { GeneralModel } from 'src/app/model/generalModel';

@Component({
  selector: 'app-filter-by-name',
  templateUrl: './filter-by-name.component.html',
  styleUrls: ['./filter-by-name.component.css']
})
export class FilterByNameComponent {

  @Input()
  public items!: GeneralModel;

  @Output()
  public filteredItems!: GeneralModel;

  constructor() { }


}
