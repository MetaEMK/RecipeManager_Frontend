

export let branches: Branch[] = []
export let categories: Category[] = []
export let recipes: Recipe[] = []
export class Branch {
    public id: number;
    public name: string;
    public slug = () => {
        return this.name.toLowerCase().replace(' ', '_');
    }


    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public static addDummyBranches() {
        console.log("addDummyBranches");
        branches.push(new Branch(0, "Konditorei"));
        branches.push(new Branch(1, "Bäckerei"));
        branches.push(new Branch(2, "Feinbäckerei"));
    }
}


export class Category {
    public id: number;
    public name: string;
    public activated: boolean = false;

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    public static addDummyCategories() {
        categories.push(new Category(0, "Kategorie 1"));
        categories.push(new Category(1, "Katgorie 2"));
        categories.push(new Category(2, "Katgorie 3"));
    }
}

export class Recipe {
    public id: number;
    public name: string;
    public description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas integer. Lorem dolor sed viverra ipsum nunc aliquet bibendum enim facilisis. Nunc consequat interdum varius sit amet mattis vulputate. Vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci. In eu mi bibendum neque egestas congue quisque. Faucibus pulvinar elementum integer enim neque volutpat ac tincidunt vitae. Id leo in vitae turpis massa sed elementum. Ipsum consequat nisl vel pretium lectus quam id. Vitae et leo duis ut diam quam nulla porttitor. Amet volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Viverra ipsum nunc aliquet bibendum enim facilisis gravida. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Dictum at tempor commodo ullamcorper a lacus vestibulum sed. Et pharetra pharetra massa massa ultricies mi quis hendrerit dolor."

    public constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
    public static addDummyRecipes() {
        recipes.push(new Recipe(0, "Rezept 1"));
        recipes.push(new Recipe(1, "Rezept 2"));
        recipes.push(new Recipe(2, "Rezept 3"));
    }
}
