import { IsEmail, IsInt, IsString } from 'class-validator';

export class ReturnUserDTO {
    id: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsInt()
    nivel: number;
}
