import { User } from "../entity/user";

export class GetUserDto {
    id: number;
    username: string;
    email: string;
    weight: number;

    public constructor(entity: User) {
        this.id = entity.id;
        this.username = entity.username;
        this.email = entity.email;
        this.weight = entity.weight;
    }
}