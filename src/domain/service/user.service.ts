import { IsNull, QueryFailedError, Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";

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
        return await this._repository.findOne({
            where: {
                id: id
            }
        });
    }

    public async delete(id: number) {
        const userToRemove = await this.getById(id);
        if (!userToRemove) {
            throw new Error("The user was't found!");
        }
        
        return await this._repository.remove(userToRemove);
    }
}