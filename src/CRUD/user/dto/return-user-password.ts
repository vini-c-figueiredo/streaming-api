import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsString } from 'class-validator';

export class ReturnUserPassDTO {
    @ApiProperty({
        description: 'id User',
    })
    id: string;

    @ApiProperty({
        description: 'name User',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'email User',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'phone User',
    })
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'password User',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'level User',
    })
    @IsInt()
    nivel: number;
}
