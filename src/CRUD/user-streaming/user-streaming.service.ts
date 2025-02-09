import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { DefaultReturn } from 'src/global/types/defaultreturn';
import { StreamingService } from '../streaming/streaming.service';
import { UserService } from '../user/user.service';
import { CreateStreamingUserDto } from './dto/create-userStreaming.dto';
import { DeleteStreamingUserDto } from './dto/delete-userStreaming.dto';
import { ReturnUserStreamingDTO } from './dto/return-userStreaming.dto';

@Injectable()
export class UserStreamingService {
    constructor(private prisma: PrismaService,
        private readonly usersService: UserService,
        private readonly streamingsService: StreamingService,
    ) { }

    async createUserStreaming(data: CreateStreamingUserDto): Promise<DefaultReturn> {
        const user = await this.usersService.getUserById(data.IdUser);

        if (!user) {
            console.log('teste')
            throw new HttpException(
                'The User does not Exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        const streaming = await this.streamingsService.getStreamingById(data.StreamingId);

        if (!streaming) {
            throw new HttpException(
                'The Streaming does not Exists',
                HttpStatus.BAD_REQUEST,
            );
        }

        const userStreaming = await this.prisma.userStreaming.findFirst({ where: { IdUser: data.IdUser, StreamingId: data.StreamingId } })

        if (userStreaming) {
            throw new HttpException(
                'User already pay this Streaming.',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            await this.prisma.userStreaming.create({ data: data });
        } catch (error) {
            throw new HttpException('An error occurred while creating the user-Streaming', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { message: 'User-Streaming created successfully' }
    }

    async getAllUserStreaming(): Promise<ReturnUserStreamingDTO[]> {
        return await this.prisma.userStreaming.findMany();
    }

    async getCountUserStreaming(idUser: string, streamingId: number): Promise<number> {
        return await this.prisma.userStreaming.count({
            where: { IdUser: idUser, StreamingId: streamingId },
        });
    }

    async getPriceByUser(idUser: string): Promise<number> {
        let total = 0;
        const data = await this.prisma.userStreaming.findMany({
            where: { IdUser: idUser },
        });

        for (const user of data) {
            const [count, value] = await Promise.all([
                this.prisma.userStreaming.count({
                    where: { StreamingId: user.StreamingId },
                }),
                this.prisma.streaming.findFirst({
                    select: { Price: true },
                    where: { id: user.StreamingId },
                }),
            ]);

            const totalstreaming = value.Price / count;

            total = total + totalstreaming;
        }

        return Math.round(total * 100) / 100;
    }

    async deleteAllUserStreaming(idUser: string): Promise<DefaultReturn> {

        await this.prisma.userStreaming.deleteMany({
            where: { IdUser: idUser },
        });

        return { message: 'UserStreaming deleted successfully' }
    }

    async deleteUserStreamingByiD(
        deleteUserStreamingDTO: DeleteStreamingUserDto,
    ): Promise<DefaultReturn> {
        await this.prisma.userStreaming.deleteMany({
            where: {
                IdUser: deleteUserStreamingDTO.IdUser,
                StreamingId: deleteUserStreamingDTO.StreamingId,
            },
        });

        return { message: 'UserStreaming deleted successfully' }
    }
}
