import { Request, Response } from "express";
import { RegisterDto } from "../dto/register.dto";
import { UserService } from "../service/user.service";
import bcrypt from 'bcryptjs'

class AuthController {
    private _userService: UserService;

    public constructor() {
        this._userService = new UserService();
    }

    public register = async (req: Request, res: Response) => {
        const regiserData = req.body as RegisterDto;
        if (this._userService.isEmailInUseAlready(regiserData.email)) {
            return res.status(400).json({ message: "The email is already in use!"});
        }

        try {
            const passwordHashed = await bcrypt.hash(regiserData.password, process.env.HASH_SALT);
            const userCreated = await this._userService.create(Object.assign(regiserData, { password: passwordHashed})); 
            return res.status(201).json(userCreated);
        } catch(error) {
            return res.status(400).json({ message: error.message });
        }
    }

    public login = async (req: Request, res: Response) => {
        
    }
}

export default new AuthController();