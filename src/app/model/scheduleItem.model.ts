import { Size } from "./size.model";
import { Variant } from "./variant.model";

export interface ScheduleItem {
    id: number;
    day: number;
    variant: Variant;
    size: Size;
    quantity: number;
}