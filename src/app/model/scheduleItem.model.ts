import { Size } from "./size.model";
import { Variant } from "./variant.model";

export interface ScheduleItem {
    id: number;
    day: number;
    variant: Variant;
    size: Size;
    quantity: number;
}

export enum scheduleItemDay {
    Montag = 1,
    Dienstag = 2,
    Mittwoch = 3,
    Donnerstag = 4,
    Freitag = 5,
    Samstag = 6,
    Sonntag = 7
}