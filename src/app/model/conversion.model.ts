import { ConversionTypes } from "./conversion-types.model";
import { Size } from "./size.model";

export interface Conversion{
    id: number;
    ConversionType: ConversionTypes;

    fromSize: Size;
    toSize: Size;
    multiplicator: number;
}