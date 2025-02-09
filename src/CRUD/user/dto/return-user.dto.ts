import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class ReturnUserDTO {
    @ApiProperty({
        example: '55ccx322-11e7-49je-8a07-96069c60eg36',
        description: 'id do usuário',
    })
    id: string;

    @ApiProperty({
        example: 'José',
        description: 'nome do usuário',
    })
    @IsString()
    name: string;

    @ApiProperty({
        example: 'Jose@email.com',
        description: 'email do usuário',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '16955602239',
        description: 'phone do usuário',
    })
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'senha do usuário',
    })
    @IsString()
    password?: string;

    @ApiProperty({
        example: 1,
        description: 'Nível do usuário',
    })
    @IsInt()
    nivel: number;
}
