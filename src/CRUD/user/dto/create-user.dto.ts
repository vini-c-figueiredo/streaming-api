import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min, MinLength } from "class-validator";

export class CreateUserDTO {
    @ApiProperty({
        description: 'nome do usuário',
    })
    @IsString()
    @MinLength(2)
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'email do usuário',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'phone do usuário',
    })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        description: 'senha do usuário',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        description: 'nivel do usuário',
    })
    @IsInt()
    @Min(1, { message: "The level must be at least 1." })
    @Max(2, { message: "The maximum level is 2." })
    @IsNotEmpty()
    nivel: number;
}