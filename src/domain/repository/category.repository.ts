import { DeleteResult, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Category } from "../entity/category";

export class CategoryRepository {
    private _databaseRepository: Repository<Category>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Category);
    }
    
    public getAll = async (): Promise<Category[]> => {
        return await this._databaseRepository.find();
    }

    public getById = async (id: number): Promise<Category> => {
        return await this._databaseRepository.findOneBy({id: id});
    }

    public save = async (category: Category): Promise<Category> => {
        return await this._databaseRepository.save(category);
    }

    public delete = async (id: number): Promise<DeleteResult> => {
        return await this._databaseRepository.delete(id);
    }
}