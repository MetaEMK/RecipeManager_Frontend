

export let branches: Branch[] = []
export class Branch {
    public name: string;
    public constructor(name: string) {
        this.name = name;
    }

    public static addDummyBranches() {
        branches.push(new Branch("Konditorei"));
        branches.push(new Branch("Bäckerei"));
        branches.push(new Branch("Feinbäckerei"));
    }
}