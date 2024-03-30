import { Request, Response } from 'express'
import { CategoryService } from '../service/category.service';
import { Category } from '../entity/category';
import { Color } from '../enum/color';

class CategoryController {
    private _service: CategoryService;

    public constructor() {
        this._service = new CategoryService();

        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async getAll(req: Request, res: Response) {
        const categories = await this._service.getAll(); 
        return res.json(categories);
    }

    public async getById(req: Request, res: Response) {
        const category = await this._service.getById(parseInt(req.params.id));
        return res.json(category);
    }

    public async create(req: Request, res: Response) {
        const reqCategory = new Category(req.body.name, Color[req.body.color]);
        try {
            const createdCategory = await this._service.create(reqCategory); 
            return res.json(createdCategory);
        }catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const categoryDeleted = await this._service.delete(parseInt(req.params.id)); 
            return res.json(categoryDeleted);
        } catch(error) {
            return res.status(400).json({message: error.message});
        }
    }
}

export default new CategoryController();