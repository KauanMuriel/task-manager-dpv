import { User } from "../entity/user";
import { UserRepository } from "../repository/user.repository";
import { DeleteResult } from "typeorm";
import NotFoundError from "../error/not-found.error";

export class UserService {
    private _userRepository: UserRepository;

    public constructor() {
        this._userRepository = new UserRepository();
    }

    public create = async (user: User) => {
        try {
            return await this._userRepository.save(user);
        }catch(error) {
            throw new Error("Wasn't possible create a new user - " + error);
        }
    }

    public getAll = async (): Promise<User[]> => {
        return await this._userRepository.getAll();
    }

    public getById = async (id: number): Promise<User> => {
        const user = await this._userRepository.getById(id);

        if (!user) throw new NotFoundError('The user was not found!');

        return user;
    }
    
    public delete = async (id: number): Promise<DeleteResult> => {
        return await this._userRepository.delete(id);
    }
}