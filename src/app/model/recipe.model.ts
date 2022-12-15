import { Branch } from "./branch.model";
import { Category } from "./category.model";
import { GeneralModelWithRouting } from "./generalModel";
import { Variant } from "./variant.model";

export interface Recipe extends GeneralModelWithRouting {
    description: string;
    imagePath: string;

    categories?: Category[];
    branches?: Branch[];
    variants?: Variant[];
}

export interface UpdateRecipe {
    name?: string;
    description?: string;

    branch_ids: {
        add?: number[];
        rmv?: number[];
    };

    category_ids: {
        add?: number[];
        rmv?: number[];
    };
}