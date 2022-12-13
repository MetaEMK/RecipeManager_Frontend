import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Query } from 'src/app/core/services/query';
import { RecipeService } from 'src/app/core/services/recipe.service';
import { SettingsService } from 'src/app/core/services/settings.service';
import { Branch } from 'src/app/model/branch.model';
import { Category } from 'src/app/model/category.model';
import { GeneralModel } from 'src/app/model/generalModel';
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

  @Input("minimumFilterCount")
  public minimumFilterCount: number = 1;

  @Output("filteredItems")
  public filteredItemsOutput: EventEmitter<Recipe[]> = new EventEmitter();


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

  constructor(
    public settingsService: SettingsService,
    private recipeService: RecipeService
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
    if(this.selectedBranchIds.length > 0)
    {
      query.addFilter("branch", this.convertIdsToString(this.selectedBranchIds));
    }
    if(this.selectedCategoryIds.length > 0)
    {
      query.addFilter("category", this.convertIdsToString(this.selectedCategoryIds));
    }
    if (query.items.length > this.minimumFilterCount)
    {
      this.recipeService.getByQuery(query).then(
        (recipes: Recipe[]) => {
          this.filteredItems = recipes;
          this.filteredItemsOutput.emit(this.filteredItems);
        })
        .catch(error => console.warn(error));
    }
    else
    {
      this.filteredItems = [];
      this.filteredItemsOutput.emit(this.filteredItems);
    }
  }

  convertIdsToString(ids: number[]): string[]
  {
    let result: string[] = [];
    ids.forEach(id => result.push(id.toString()));
    return result;
  }

}
