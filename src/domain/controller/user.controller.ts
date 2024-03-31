import { Request, Response } from 'express'
import { UserService } from '../service/user.service'
import { GetUserDto } from '../dto/get-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import NotFoundError from '../error/not-found.error';
import HttpError from '../error/http.error';

class UserController {
    private _service: UserService;

    public constructor() {
        this._service = new UserService();
    }

    public async getAll(req: Request, res: Response) {
        const users = await this._service.getAll();
        const usersDto = users.map(user => new GetUserDto(user));
        return res.json(usersDto);
    }

    public async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "The user id must be a integer!" });
        }

        try {
            const user = await this._service.getById(id);
            return res.json(new GetUserDto(user));
        } catch (error) {
            let statusCode: number;
            if (error instanceof NotFoundError) {
                statusCode = 404;
            } else if (error instanceof HttpError) {
                statusCode = 400;
            } else {
                statusCode = 500;
            }
            return res.status(statusCode).json({ message: error.message });
        }
    }

    public create = async (req: Request, res: Response) => {
        try {
            const createdUser = await this._service.create(req.body as CreateUserDto);
            return res.json(createdUser);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public delete = async (req: Request, res: Response) => {
        try {
            const userDeleted = await this._service.delete(parseInt(req.params.id));
            return res.json(userDeleted);
        } catch (error) {
            let statusCode: number;
            if (error instanceof NotFoundError) {
                statusCode = 404;
            } else {
                statusCode = 500;
            }
            return res.status(statusCode).json({ message: error.message });
        }
    }
    
    public update = async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "The user id must be a integer!" })

        try {
            const updatedUser = await this._service.update(id, req.body as UpdateUserDto);
            return res.json(updatedUser);
        } catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export default new UserController();