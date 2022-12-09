import { Branch } from "./branch.model";
import { Category } from "./category.model";


export interface Recipe {
    id: number;
    name: string;
    description: string;
    image_path: string;

    categories: Category[];
    branches: Branch[];
}