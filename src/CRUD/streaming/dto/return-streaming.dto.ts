import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class ReturnStreamingDTO {
    @ApiProperty({ example: 1, description: 'id do Streaming' })
    @IsInt()
    id: number;

    @ApiProperty({ example: 'Netflix', description: 'nome do Streaming' })
    @IsString()
    name: string;

    @ApiProperty({ example: 27.40, description: 'Preço do Streaming' })
    @IsNumber()
    Price: number;

    @ApiProperty({ example: 'netflix.com', description: 'link do Streaming' })
    @IsString()
    Link: string;
}
