import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateStreamingDTO } from './dto/create-streaming.dto';
import { ReturnStreamingDTO } from './dto/return-streaming.dto';

@Injectable()
export class StreamingService {
    constructor(private prisma: PrismaService) { }

    async createStreaming(
        createStreaming: CreateStreamingDTO,
    ): Promise<{ message: string }> {

        try {
            await this.prisma.streaming.create({ data: createStreaming });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new HttpException('Streaming already exists', HttpStatus.CONFLICT);
            }
            throw new HttpException('An error occurred while creating the streaming', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { message: 'Streaming created successfully' };
    }

    async getStreamingByName(name: string): Promise<ReturnStreamingDTO> {
        return await this.prisma.streaming.findFirst({ where: { name: name } });
    }

    async getAllStreaming(): Promise<ReturnStreamingDTO[]> {
        return await this.prisma.streaming.findMany();
    }

    async getStreamingPriceByName(
        name: string,
    ): Promise<{ Price: number }> {
        return await this.prisma.streaming.findFirst({
            select: { Price: true },
            where: { name: name },
        });
    }

    async updateStreamingPrice(
        name: string,
        price: number,
    ): Promise<ReturnStreamingDTO> {
        return await this.prisma.streaming.update({
            where: { name: name },
            data: price,
        });
    }

    async deleteStreamingByName(name: string): Promise<{ message: string }> {

        try {
            const streaming = await this.getStreamingByName(name);

            if (!streaming) {
                throw new HttpException('Streaming not found', HttpStatus.NOT_FOUND);
            }

            await this.prisma.streaming.delete({
                where: { name },
            });

            return { message: 'Streaming deleted successfully' };
        } catch (error) {
            throw new HttpException(
                'An error occurred while deleting the streaming',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

}
