import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Query, QueryItem } from 'src/app/core/query';
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

  public unasignedBranches: boolean = false;
  public unasignedCategories: boolean = false;
  public unassignedCategoryState: boolean = false;
  public unassignedBranchState: boolean = false;

  public queryForUnassignedBranches: QueryItem = new QueryItem("branchNone", ["true"]);
  public queryForUnassignedCategory: QueryItem = new QueryItem("categoryNone", ["true"]);

  public nameQuery?: string;

  constructor(
    public settingsService: SettingsService,
    public recipeService: RecipeService,
  ) { }

  ngOnInit() {
    this.filteredItems = [];
    
    if(this.filterCategories)
    {
      if(this.branches.length === 1)
      {
        const query = new Query();
        query.add("branch", this.branches[0].id.toString());
        query.addQueryItem(this.queryForUnassignedCategory);
        this.recipeService.getByQuery(query).then(recipes => (recipes.length > 0)  ? this.unasignedCategories = true: this.unasignedCategories = false);
      }
    }

    if(this.filterBranches)
    {
      if(this.categories.length === 1)
      {
        const query = new Query();
        query.add("category", this.categories[0].id.toString());
        query.addQueryItem(this.queryForUnassignedBranches);
        this.recipeService.getByQuery(query).then(recipes => (recipes.length > 0)  ? this.unasignedBranches = true: this.unasignedBranches = false);
      }
    }

    if(this.filterCategories && this.filterBranches)
    {
      let searchQuery = new Query();
      console.log(searchQuery.toString())
      searchQuery.addQueryItem(this.queryForUnassignedBranches);
      searchQuery.addQueryItem(this.queryForUnassignedCategory);
      this.recipeService.getByQuery(searchQuery)
      .then(recipes => (recipes.length > 0)  ? this.unasignedBranches = this.unasignedCategories = true: this.unasignedBranches = this.unasignedCategories = false)
      .catch(error => console.log(error));
    }
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

  public onChangeUnassignedBranches(event: boolean)
  {
    this.unassignedBranchState = event;
    this.filterItems();
  }

  public onChangeUnassignedCategories(event: boolean)
  {
    this.unassignedCategoryState = event;
    this.filterItems();
  }

  public onChangeNameQuery(event: string)
  {
    this.nameQuery = event;
    this.filterItems();
  }

  public filterItems()
  {
    let query = new Query();
    if(this.selectedBranchIds.length > 0 && this.filterBranches)
      query.addFilter("branch", this.convertIdsToString(this.selectedBranchIds));

    if(this.selectedCategoryIds.length > 0 && this.filterCategories)
      query.addFilter("category", this.convertIdsToString(this.selectedCategoryIds));

    if(this.nameQuery && this.filterByName) query.add("name", this.nameQuery);

    if(this.unassignedBranchState && this.filterBranches) query.addQueryItem(this.queryForUnassignedBranches);
    if(this.unassignedCategoryState && this.filterCategories) query.addQueryItem(this.queryForUnassignedCategory);

    console.log(query.toString());
    this.filteredItemsOutput.emit(query);
  }

  convertIdsToString(ids: number[]): string[]
  {
    let result: string[] = [];
    ids.forEach(id => result.push(id.toString()));
    return result;
  }

}
