import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { DefaultReturn } from 'src/global/types/defaultreturn';
import { CreateUserDTO } from './dto/create-user.dto';
import { ReturnUserDTO } from './dto/return-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(dataUser: CreateUserDTO): Promise<DefaultReturn> {

        dataUser.password = await bcrypt.hash(dataUser.password, 10);

        try {
            await this.prisma.user.create({ data: dataUser });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
            }
            throw new HttpException('An error occurred while creating the user', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { message: 'User created successfully' }
    }

    async getAllUsers(): Promise<ReturnUserDTO[]> {
        const response = await this.prisma.user.findMany();
        const responses = response.map((responseItem) => {
            const { password, ...rest } = responseItem;
            return rest;
        })
        return responses;
    }

    async getUserByEmail(email: string): Promise<ReturnUserDTO | null> {
        const response = await this.prisma.user.findUnique({ where: { email: email } })
        const { password, ...rest } = response;
        return rest;
    }

    async getUserByEmailWithPassword(email: string): Promise<ReturnUserDTO | null> {
        return await this.prisma.user.findUnique({ where: { email: email } })
    }

    async getUserById(id: string): Promise<ReturnUserDTO | null> {
        const response = await this.prisma.user.findUnique({ where: { id: id } })
        if (!response) {
            return null;
        }
        const { password, ...rest } = response;
        return rest;
    }

    async getUserLevel(id: string): Promise<number> {
        const response = await this.prisma.user.findUnique({ where: { id: id } })
        const { nivel } = response;

        return nivel;
    }

    async deleteUserById(id: string): Promise<DefaultReturn> {
        const user = await this.getUserById(id);

        if (!user) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }

        try {
            await this.prisma.user.delete({
                where: { id },
            });
        } catch (error) {
            throw new HttpException(
                'An error occurred while deleting the user',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        return { message: 'user deleted successfully' };
    }

}