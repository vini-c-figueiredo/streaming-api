import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  async createUser(@Body() dataUser: CreateUserDTO): Promise<{ message: string }> {
    const response = await this.userService.createUser(dataUser);

    return response;
  }

  @Get()
  @HttpCode(200)
  async getUsers(@Query('email') email?: string, @Query('id') id?: string) {
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
  @HttpCode(204)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUserById(id);
  }
}
