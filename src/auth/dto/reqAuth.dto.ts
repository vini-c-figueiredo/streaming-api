import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ReqAuthDTO {
    @ApiProperty({
        description: 'email User',
    })
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'id User',
    })
    @IsNotEmpty()
    id: string

    userLevel: number;
}