import { Category } from "./category.model";
import { Recipe } from "./recipe.model";

export interface Branch {
    id: number;
    name: string;
    slug: string;

    recipeCategories: Category[];
    recipes: Recipe[];
    recipe_ids: number[];
}