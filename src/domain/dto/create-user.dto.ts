import { IsNotEmpty, IsNumber, IsString, MinLength, Validate, ValidateIf } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(8, { message: "The username must have at least 8 characters"})
    username: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @ValidateIf((object, value) => value !== undefined)
    weight!: number | null;
}