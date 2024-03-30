import { IsEnum, IsNotEmpty, IsNumber, IsString, ValidateIf } from "class-validator";
import { Status } from "../enum/status";

export class CreateUpdateTaskDto {
    @ValidateIf((object, value) => value !== undefined)
    @IsNumber()
    @IsNotEmpty()
    categoryId: number;

    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    type: string;
    
    @IsEnum(Status)
    status: Status;
}