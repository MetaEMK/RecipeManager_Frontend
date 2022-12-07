import { Branch } from "./branch.model";
import { Category } from "./category.model";

export class Recipe
{
    public id: number;
    public name: string;
    public description: string;
    public image_url: string = "https://img.chefkoch-cdn.de/rezepte/2374971376648018/bilder/604591/crop-642x428/zwetschgenkuchen-fuer-dummies.jpg";

    public branch: Branch;
    public categories: Category[] = [];

    constructor(id: number, name: string, description: string, branch: Branch, image_url?: string)
    {
        this.id = id;
        this.name = name;
        this.description = description;


        this.branch = branch;
    }
}