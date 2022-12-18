import { ConversionTypes } from "./conversion-types.model";
import { GeneralModel } from "./generalModel";
import { Ingredient } from "./ingredient.model";
import { Recipe } from "./recipe.model";
import { Size } from "./size.model";


export interface Variant extends GeneralModel {
    description: string;
    size: Size;
    conversionType: ConversionTypes
    
    recipe: Recipe;
    ingredients: Ingredient[];
}
