import { Branch } from "./branch.model";
import { Category } from "./category.model";
import { GeneralModelWithRouting } from "./generalModel";


export interface Recipe extends GeneralModelWithRouting {
    description: string;
    imagePath: string;

    categories: Category[];
    branches: Branch[];
}