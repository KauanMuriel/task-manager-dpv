import { Request, Response } from 'express'
import { CategoryService } from '../service/category.service';
import { Category } from '../entity/category';
import { Color } from '../enum/color';
import { CreateUpdateCategoryDto } from '../dto/create-update-category.dto';

class CategoryController {
    private _service: CategoryService;

    public constructor() {
        this._service = new CategoryService();
    }

    public getAll = async (req: Request, res: Response) => {
        const categories = await this._service.getAll(); 
        return res.json(categories);
    }

    public getById = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);

        if (isNaN(id)) return res.status(400).json({ message: "The category id must be an integer"});

        const category = await this._service.getById(parseInt(req.params.id));
        return res.json(category);
    }

    public create = async (req: Request, res: Response) => {
        const reqCategory = new Category(req.body.name, Color[req.body.color]);
        try {
            const createdCategory = await this._service.create(reqCategory); 
            return res.json(createdCategory);
        }catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public update = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
    
        if (isNaN(id)) return res.status(400).json({ message: "The category id must be an integer"});

        try {
            const updatedUser = await this._service.update(id, req.body as CreateUpdateCategoryDto);
            return res.json(updatedUser);
        } catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const categoryDeleted = await this._service.delete(parseInt(req.params.id)); 
            return res.json(categoryDeleted);
        } catch(error) {
            return res.status(400).json({message: error.message});
        }
    }
}

export default new CategoryController();