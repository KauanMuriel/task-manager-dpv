import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export class UserService {
    private _repository: Repository<User>;

    public constructor() {
        this._repository = AppDataSource.getRepository(User);
    }

    public create(user: User) {
        return this._repository.create(user);
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
        return await this._repository.remove(userToRemove);
    }
}