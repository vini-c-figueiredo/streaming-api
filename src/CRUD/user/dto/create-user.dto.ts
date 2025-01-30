import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min, MinLength } from "class-validator";

export class CreateUserDTO {
    @ApiProperty({
        description: 'name User',
    })
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'email User',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'phone User',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        description: 'password User',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'level User',
    })
    @IsInt()
    @Min(1, { message: "The level must be at least 1." })
    @Max(2, { message: "The maximum level is 2." })
    @IsNotEmpty()
    nivel: number;
}