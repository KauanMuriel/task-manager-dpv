import { Category } from "../entity/category";
import { CategoryRepository } from "../repository/category.repository";

export class CategoryService {
    _categoryRepository: CategoryRepository;

    public constructor() {
        this._categoryRepository = new CategoryRepository();
    }

    public getAll = async (): Promise<Category[]> => {
        return await this._categoryRepository.getAll();
    }

    public getById = async (id: number): Promise<Category> => {
        return await this._categoryRepository.getById(id);
    }

    public create = async (category: Category) => {
        return await this._categoryRepository.save(category);
    }

    public delete = async (id: number) => {
        return await this._categoryRepository.delete(id);
    }
}