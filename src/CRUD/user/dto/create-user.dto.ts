import { IsEmail, IsInt, IsString, Max, Min } from "class-validator";

export class CreateUserDTO {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    password: string;

    @IsInt()
    @Min(1, { message: "The level must be at least 1." })
    @Max(2, { message: "The maximum level is 2." })
    nivel: number;
}