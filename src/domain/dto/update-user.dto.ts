import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: "The username must have at least 8 characters"})
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}