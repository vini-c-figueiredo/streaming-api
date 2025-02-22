import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLevel } from 'src/global/decorators/user-level.decorator';
import { DefaultReturn } from 'src/global/types/defaultreturn';
import { CreateUserDTO } from './dto/create-user.dto';
import { ReturnUserDTO } from './dto/return-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  @UserLevel(2)
  async createUser(@Body() dataUser: CreateUserDTO): Promise<DefaultReturn> {
    const response = await this.userService.createUser(dataUser);

    return response;
  }

  @Get()
  @HttpCode(200)
  @UserLevel(1)
  async getUsers(@Query('email') email?: string, @Query('id') id?: string): Promise<ReturnUserDTO | ReturnUserDTO[] | null> {
    if (email && id) {
      throw new HttpException('You must provide either an email or an id, not both.', HttpStatus.BAD_REQUEST);
    }

    if (email) {
      return await this.userService.getUserByEmail(email)
    };
    if (id) {
      return await this.userService.getUserById(id)
    };

    return await this.userService.getAllUsers();
  }

  @Delete(':id')
  @HttpCode(200)
  @UserLevel(2)
  async deleteUser(@Param('id') id: string): Promise<DefaultReturn> {
    return await this.userService.deleteUserById(id);
  }
}
