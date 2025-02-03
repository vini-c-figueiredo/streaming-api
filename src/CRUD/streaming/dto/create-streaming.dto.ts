import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStreamingDTO {
    @ApiProperty({
        description: 'Streaming name',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Streaming Price',
    })
    @IsNumber()
    @IsNotEmpty()
    Price: number;

    @ApiProperty({
        description: 'Streaming site Link',
    })
    @IsString()
    @IsNotEmpty()
    Link: string;
}
