import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Color } from "../enum/color";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(Color)
    color: Color;
}