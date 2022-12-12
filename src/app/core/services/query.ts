
export class QueryItem {
    key: string;
    value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }

    toString(): string {
        return `${this.key}=${this.value}`;
    }
}


export class Query {
    private _items: QueryItem[] = [];

    public get items(): QueryItem[] {
        return this._items;
    }

    constructor(queryItems?: QueryItem) {
        if (queryItems) {
            this._items.push(queryItems);
        }
    }

    public add(key: string, value: string): void {
        if(this._items.find((item) => item.key === key) === undefined)
            this._items.push(new QueryItem(key, value));
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
        query = query.slice(0, -1);
        console.log(query);
        return query;
    }
}