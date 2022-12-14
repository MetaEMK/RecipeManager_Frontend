import { Branch } from "./branch.model";
import { GeneralModel } from "./generalModel";
import { Recipe } from "./recipe.model";

export interface Category extends GeneralModel {
    recipes: Recipe[];
    recipeBranches: Branch[];
}