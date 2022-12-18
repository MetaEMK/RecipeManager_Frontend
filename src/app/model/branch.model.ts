import { Category } from "./category.model";
import { GeneralModelWithRouting } from "./generalModel";
import { Recipe } from "./recipe.model";

export interface Branch extends GeneralModelWithRouting {

    recipeCategories: Category[];
    recipes: Recipe[];
}