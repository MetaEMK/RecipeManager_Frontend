import { GeneralModel } from "./generalModel";

export interface Ingredient extends GeneralModel {
    quantity: number;
    unit: string;
    section: number;
    order: number;
}