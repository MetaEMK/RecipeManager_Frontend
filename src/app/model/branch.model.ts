import { Category } from "./category.model";

export interface Branch {
    id: number;
    name: string;
    slug: string;

    recipeCategories: Category[];
    recipe_ids: number[];
}