import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStreamingDTO {
    @ApiProperty({
        description: 'nome do streaming',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Preço do streaming',
    })
    @IsNumber()
    @IsNotEmpty()
    Price: number;

    @ApiProperty({
        description: 'link do site do streaming',
    })
    @IsString()
    @IsNotEmpty()
    Link: string;
}
