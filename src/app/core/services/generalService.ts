export interface GeneralService<GeneralModel> {
    getAll(): Promise<GeneralModel[]>;
    getById(id: number): Promise<GeneralModel>;
    create(name: string): Promise<GeneralModel>;
    delete(id: number): Promise<void>;
}
