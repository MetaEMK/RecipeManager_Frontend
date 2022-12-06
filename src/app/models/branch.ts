export class Branch
{
    public id?: number;
    public name: string;
    public slug?: string;

    constructor(name: string, id?: number, slug?: string)
    {
        this.id = id;
        this.name = name;
        this.slug = slug;
    }
}