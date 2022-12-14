import { Branch } from "./branch.model";
import { GeneralModelWithRouting } from "./generalModel";
import { Recipe } from "./recipe.model";

export interface Category extends GeneralModelWithRouting {
    recipes: Recipe[];
    recipeBranches: Branch[];
}