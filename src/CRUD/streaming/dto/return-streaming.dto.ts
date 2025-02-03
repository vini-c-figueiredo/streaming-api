import { IsInt, IsNumber, IsString } from 'class-validator';

export class ReturnStreamingDTO {
    @IsInt()
    id: number;

    @IsString()
    name: string;

    @IsNumber()
    Price: number;

    @IsString()
    Link: string;
}
