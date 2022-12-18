
export class QueryItem {
    key: string;
    values: string[] = [];

    constructor(key: string, values: string[]) {
        this.key = key;
        this.values = values;
    }

    toString(): string {
        let query = "";
        this.values.forEach((value) => {
            query += this.key + '=' + value + '&';
        });
        query = query.slice(0, -1);
        return query;
    }
}


export class Query {
    private _items: QueryItem[] = [];

    public get items(): QueryItem[] {
        return this._items;
    }

    public offset?: number;
    public limit?: number;

    constructor(queryItems?: QueryItem) {
        if (queryItems) {
            this._items.push(queryItems);
        }
    }

    public add(key: string, value: string): void {
        if(this._items.find((item) => item.key === key) === undefined)
            this._items.push(new QueryItem(key, [value]));
    }

    public addFilter(key: string, value: string[]): void {
        const queryItem = new QueryItem(key, value);
        this.addQueryItem(queryItem);
    }

    public addQueryItem(queryItem: QueryItem): void {
        if(this._items.find((item) => item.key === queryItem.key) === undefined)
            this._items.push(queryItem);
    }

    public addQueryItems(queryItems: QueryItem[]): void {
        queryItems.forEach((item) => {
            this.addQueryItem(item);
        });
    }

    public toString(): string {
        let query = '?';
        this._items.forEach((item) => {
            query += item.toString() + '&';
        });

        if(this.offset !== undefined && this.limit !== undefined) 
        {
            query += 'offset=' + this.offset + '&';
            query += 'limit=' + this.limit + '&';
        }
        query = query.slice(0, -1);
        return query;
    }
}