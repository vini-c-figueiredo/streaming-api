import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class BaseUserStreamingDTO {
    @ApiProperty({
        description: 'id do usuário',
    })
    @IsString()
    @IsNotEmpty()
    IdUser: string;

    @ApiProperty({
        description: 'id do Streaming',
    })
    @IsInt()
    @IsNotEmpty()
    StreamingId: number;
}
