import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/category";

export class CategoryRepository {
    private _databaseRepository: Repository<Category>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Category);
    }
    
    public getById = async (id: number): Promise<Category> => {
        return await this._databaseRepository.findOneBy({id: id});
    }
}