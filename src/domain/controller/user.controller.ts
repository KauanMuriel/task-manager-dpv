import { Request, Response } from 'express'
import { UserService } from '../service/user.service'
import { User } from '../entity/user';
import { GetUserDto } from '../dto/get-user.dto';
import NotFoundError from '../error/not-found.error';
import HttpError from '../error/http.error';
import { CreateUserDto } from '../dto/create-user.dto';

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
        const usersDto = users.map(user => new GetUserDto(user));
        return res.json(usersDto);
    }

    public async getById(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "The id must be a integer!" });
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

    public async create(req: Request, res: Response) {
        const reqCreateUser = new CreateUserDto(req.body);
        const reqUser = new User(reqCreateUser.username, reqCreateUser.email, reqCreateUser.password, reqCreateUser.weight);
        try {
            const createdUser = await this._service.create(reqUser);
            return res.json(createdUser);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public async delete(req: Request, res: Response) {
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
            return res.status(400).json({ message: error.message });
        }
    }
}

export default new UserController();