import { ConversionTypes } from "./conversion-types.model";
import { GeneralModel } from "./generalModel";

export interface Size extends GeneralModel {
    conversionType: ConversionTypes
}