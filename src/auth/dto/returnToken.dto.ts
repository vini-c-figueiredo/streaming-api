import { ApiProperty } from "@nestjs/swagger"

export class returnTokenDTO {
    @ApiProperty({
        description: 'Token de autenticação',
    })
    access_token: string

    @ApiProperty({
        description: 'id User',
    })
    id: string
}