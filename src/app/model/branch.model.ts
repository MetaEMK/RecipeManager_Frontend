import { Category } from "./category.model";
import { GeneralModel } from "./generalModel";
import { Recipe } from "./recipe.model";

export interface Branch extends GeneralModel {

    recipeCategories: Category[];
    recipes: Recipe[];
}