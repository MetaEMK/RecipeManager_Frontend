import { Branch } from "./branch.model";
import { Recipe } from "./recipe.model";

export interface Category {
    id: number;
    name: string;


    recipes: Recipe[];
    branches: Branch[];
}