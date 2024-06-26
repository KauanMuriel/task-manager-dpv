import { DeleteResult, Repository, UpdateResult } from "typeorm";
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

    public getByEmail = async (email: string): Promise<User> => {
        return await this._databaseRepository.findOneBy({ email: email});
    }

    public getAll = async (): Promise<User[]> => {
        return await this._databaseRepository.find();
    }

    public save = async (user: User): Promise<User> => {
        return await this._databaseRepository.save(user);
    }

    public update = async (user: User): Promise<UpdateResult> => {
        return await this._databaseRepository.update(user.id, user);
    } 

    public delete = async (id: number): Promise<DeleteResult> => {
        return await this._databaseRepository.delete(id);
    }
}