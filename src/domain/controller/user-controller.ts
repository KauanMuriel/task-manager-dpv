import { Request, Response } from 'express'
import { UserService } from '../service/user-service'
import { User } from '../entity/User';

class UserController {
    private _service: UserService;

    public constructor() {
        this._service = new UserService();
    }

    public async getAll(req: Request, res: Response) {
        return await this._service.getAll();
    }

    public async getById(req: Request, res: Response) {
        return await this._service.getById(parseInt(req.params.id));
    }

    public create(req: Request, res: Response) {
        return this._service.create(new User());
    }

    public async delete(req: Request, res: Response) {
        return await this._service.delete(parseInt(req.params.id));
    }
}

export default new UserController();