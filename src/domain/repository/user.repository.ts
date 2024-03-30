import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entity/user";

export class UserRepository {
    private _databaseRepository: Repository<User>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(User);
    }
    
    public getById = async (id: number): Promise<User> => {
        return await this._databaseRepository.findOneBy({id: id});
    }
}