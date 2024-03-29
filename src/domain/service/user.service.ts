import { User } from "../entity/user";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import NotFoundError from "../error/not-found.error";

export class UserService {
    private _repository: Repository<User>;

    public constructor() {
        this._repository = AppDataSource.getRepository(User);

        this.create = this.create.bind(this);
        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.delete = this.delete.bind(this);
    }

    public async create(user: User) {
        try {
            return await this._repository.save(user);
        }catch(error) {
            throw new Error("Wasn't possible create a new user - " + error);
        }
    }

    public async getAll() {
        return await this._repository.find();
    }

    public async getById(id: number): Promise<User> {
        const user = await this._repository.findOne({
            where: { id: id }
        });

        if (!user) {
            throw new NotFoundError('The user was not found!');
        }
        return user;
    }
    
    public async delete(id: number) {
        const userToRemove = await this.getById(id);
        return await this._repository.remove(userToRemove);
    }
}