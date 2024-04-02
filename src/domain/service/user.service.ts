import { User } from "../entity/user";
import { UserRepository } from "../repository/user.repository";
import { DeleteResult, UpdateResult } from "typeorm";
import NotFoundError from "../error/not-found.error";
import { UpdateUserDto } from "../dto/update-user.dto";
import { RegisterDto } from "../dto/register.dto";

export class UserService {
    private _userRepository: UserRepository;

    public constructor() {
        this._userRepository = new UserRepository();
    }

    public getAll = async (): Promise<User[]> => {
        return await this._userRepository.getAll();
    }

    public getById = async (id: number): Promise<User> => {
        const user = await this._userRepository.getById(id);

        if (!user) throw new NotFoundError('The user was not found!');

        return user;
    }

    public getByEmail = async (email: string): Promise<User> => {
        return await this._userRepository.getByEmail(email);
    }

    public create = async (user: RegisterDto) => {
        try {
            const newUser = new User(user.username, user.email, user.password, user.weight);
            return await this._userRepository.save(newUser);
        }catch(error) {
            throw new Error("Wasn't possible create a new user - " + error);
        }
    }

    public update = async (id: number, user: UpdateUserDto): Promise<UpdateResult> => {
        const outdateUser = await this.getById(id);
        outdateUser.username = user.username;
        outdateUser.password = user.password;
        return await this._userRepository.update(outdateUser);
    }
    
    public delete = async (id: number): Promise<DeleteResult> => {
        return await this._userRepository.delete(id);
    }

    public isEmailInUseAlready(email: string): boolean { 
        return this._userRepository.getByEmail(email) != null;
    }
}