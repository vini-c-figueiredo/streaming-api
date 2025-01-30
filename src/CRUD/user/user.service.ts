import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/global/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { ReturnUserDTO } from './dto/return-user.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async createUser(dataUser: CreateUserDTO): Promise<{ message: string }> {

        dataUser.password = await bcrypt.hash(dataUser.password, 10);

        try {
            await this.prisma.user.create({ data: dataUser });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new HttpException('Email is already in use', HttpStatus.CONFLICT);
            }
            throw new HttpException('An error occurred while creating the user', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return { message: 'User created.' }
    }

    async getAllUsers(): Promise<ReturnUserDTO[]> {
        return await this.prisma.user.findMany();
    }

    async getUserByEmail(email: string): Promise<ReturnUserDTO | null> {
        return await this.prisma.user.findUnique({ where: { email: email } })
    }

    async getUserById(id: string): Promise<ReturnUserDTO | null> {
        return await this.prisma.user.findUnique({ where: { id: id } })
    }

    async deleteUserById(id: string): Promise<void> {
        await this.prisma.user.delete({ where: { id: id } });
    }
}
