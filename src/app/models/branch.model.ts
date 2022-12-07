import { Recipe } from "./recipe.model";

export class Branch
{
    public id?: number;
    public name: string;
    public slug?: string;

    public created_at?: string;
    public updated_at?: string;

    public recipes: Recipe[] = [];

    constructor(name: string, id?: number, slug?: string , created_at?: string, updated_at?: string)
    {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}