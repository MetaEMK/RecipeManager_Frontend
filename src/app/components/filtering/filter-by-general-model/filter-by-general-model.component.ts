import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Query } from 'src/app/core/services/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { Recipe } from 'src/app/model/recipe.model';

@Component({
  selector: 'app-filter-by-general-model',
  templateUrl: './filter-by-general-model.component.html',
  styleUrls: ['./filter-by-general-model.component.css']
})
export class FilterByGeneralModelComponent implements OnInit {

  @Input("categories")
  public categories: Category[] = [];

  @Input("branches")
  public branches: Branch[] = [];

  @Input("filterBranches")
  public filterBranches?: boolean = true;

  @Input("filterByName")
  public filterByName?: boolean = true;

  @Input("filterCategories")
  public filterCategories?: boolean = true;

  @Input("minimumFilterCount")
  public minimumFilterCount: number = 1;

  @Output("filteredItems")
  public filteredItemsOutput: EventEmitter<Query> = new EventEmitter();
  private query: Query = new Query();

  public get showBranches(): boolean
  {
    return this.branches.length > 1
  }

  public get showCategories(): boolean
  {
    return this.categories.length > 1
  }

  public filteredItems: Recipe[] = [];
  public selectedCategoryIds: number[] = [];
  public selectedBranchIds: number[] = [];

  public nameQuery: Query = new Query();

  constructor(
    public settingsService: SettingsService,
  ) { }

  ngOnInit() {
    this.filteredItems = [];
    if(this.branches.length === 1) this.selectedBranchIds.push(this.branches[0].id);
    if(this.categories.length === 1) this.selectedCategoryIds.push(this.categories[0].id);
  }

  public onChangeSelectedBranches(event: number[])
  {
    this.selectedBranchIds = event;
    this.filterItems();
  }

  public onChangeSelectedCategories(event: number[])
  {
    this.selectedCategoryIds = event;
    this.filterItems();
  }

  public filterItems()
  {
    let query = new Query();
    if(this.selectedBranchIds.length > 0 && this.filterBranches)
    {
      query.addFilter("branch", this.convertIdsToString(this.selectedBranchIds));
    }
    if(this.selectedCategoryIds.length > 0 && this.filterCategories)
    {
      query.addFilter("category", this.convertIdsToString(this.selectedCategoryIds));
    }
    if (query.items.length > this.minimumFilterCount)
    {
      this.query = query;
    }
    if(this.nameQuery.items.length > 0 && this.filterByName) query.items.push(...this.nameQuery.items);
    this.filteredItemsOutput.emit(query);
  }

  public addNameQuery(query: Query)
  {
    this.nameQuery = query;
    this.filterItems();
  }

  convertIdsToString(ids: number[]): string[]
  {
    let result: string[] = [];
    ids.forEach(id => result.push(id.toString()));
    return result;
  }

}
