import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ReqAuthDTO {
    @ApiProperty({
        description: 'email do usuário',
    })
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'id do usuário',
    })
    @IsNotEmpty()
    id: string

    userLevel: number;
}