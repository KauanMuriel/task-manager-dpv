import { Request, Response } from 'express'
import { UserService } from '../service/UserService'
import { User } from '../entity/User';

class UserController {
    private _service: UserService;

    public constructor() {
        this._service = new UserService();

        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async getAll(req: Request, res: Response) {
        const users = await this._service.getAll(); 
        return res.json(users);
    }

    public async getById(req: Request, res: Response) {
        const user = await this._service.getById(parseInt(req.params.id));
        return res.json(user);
    }

    public async create(req: Request, res: Response) {
        const reqUser = new User(req.body.username, req.body.email, req.body.password);
        try {
            const createdUser = await this._service.create(reqUser); 
            return res.json(createdUser);
        }catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const userDeleted = await this._service.delete(parseInt(req.params.id)); 
            return res.json(userDeleted);
        } catch(error) {
            return res.status(400).json({message: error.message});
        }
    }
}

export default new UserController();