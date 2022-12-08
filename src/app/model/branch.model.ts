import { Category } from "./category.model";

export interface Branch {
    id: number;
    name: string;
    slug: string;

    categories: Category[];
    recipe_ids: number[];
}