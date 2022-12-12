import { Branch } from "./branch.model";
import { Category } from "./category.model";
import { GeneralModel } from "./generalModel";


export interface Recipe extends GeneralModel {
    description: string;
    image_path: string;

    categories: Category[];
    branches: Branch[];
}