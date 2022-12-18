import { GeneralModel } from "./generalModel";
import { Size } from "./size.model";

export interface ConversionTypes extends GeneralModel {
    sizes: Size[];
}