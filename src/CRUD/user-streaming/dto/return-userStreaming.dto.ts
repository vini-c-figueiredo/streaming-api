import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class ReturnUserStreamingDTO {
    @ApiProperty({
        example: 1,
        description: 'id relação usuário Streaming',
    })
    @IsInt()
    id: number;

    @ApiProperty({
        example: '55ccx322-11e7-49je-8a07-96069c60eg36',
        description: 'id do usuário',
    })
    @IsString()
    IdUser: string;

    @ApiProperty({
        example: 1,
        description: 'id do Streaming',
    })
    @IsInt()
    StreamingId: number;
}
