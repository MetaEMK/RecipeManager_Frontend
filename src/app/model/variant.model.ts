import { ConversionTypes } from "./conversion-types.model";
import { GeneralModel } from "./generalModel";
import { Ingredient } from "./ingredient.model";
import { Size } from "./size.model";


export interface Variant extends GeneralModel {
    description: string;
    size: Size;
    conversionType: ConversionTypes
    
    ingredients: Ingredient[];
}
