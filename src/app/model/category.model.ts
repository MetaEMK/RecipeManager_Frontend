export interface Category {
    id: number;
    name: string;

    branch_ids: number[];
    recipe_ids: number[];
}