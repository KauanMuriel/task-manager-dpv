import { Repository } from "typeorm";
import { Category } from "../entity/category";
import { AppDataSource } from "../data-source";

export class CategoryService {
    _repository: Repository<Category>;

    public constructor() {
        this._repository = AppDataSource.getRepository(Category);

        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async getAll(): Promise<Category[]> {
        return await this._repository.find();
    }

    public async getById(id: number): Promise<Category> {
        return await this._repository.findOne({
            where: {id: id}
        });
    }

    public async create(category: Category) {
        return await this._repository.save(category);
    }

    public async delete(id: number) {
        const categoryToBeDeleted = await this.getById(id);
        return await this._repository.delete(categoryToBeDeleted);
    }
}