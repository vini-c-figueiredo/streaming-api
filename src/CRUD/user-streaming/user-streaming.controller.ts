import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLevel } from 'src/global/decorators/user-level.decorator';
import { DefaultReturn } from 'src/global/types/defaultreturn';
import { CreateStreamingUserDto } from './dto/create-userStreaming.dto';
import { DeleteStreamingUserDto } from './dto/delete-userStreaming.dto';
import { ReturnUserStreamingDTO } from './dto/return-userStreaming.dto';
import { UserStreamingService } from './user-streaming.service';

@Controller('user-streaming')
@ApiTags('user-streaming')
export class UserStreamingController {
  constructor(private readonly userStreamingService: UserStreamingService) { }

  @Post()
  @HttpCode(201)
  @UserLevel(2)
  async createUserStreaming(@Body() data: CreateStreamingUserDto): Promise<DefaultReturn> {
    return await this.userStreamingService.createUserStreaming(data);
  }

  @Get()
  @HttpCode(200)
  @UserLevel(1)
  async getAllUserStreaming(): Promise<ReturnUserStreamingDTO[]> {
    return await this.userStreamingService.getAllUserStreaming();
  }

  @Get(':IdUser')
  @HttpCode(200)
  @UserLevel(1)
  async getUserPrice(@Param('IdUser') IdUser: string): Promise<number> {
    return await this.userStreamingService.getPriceByUser(IdUser);
  }

  @Get(':IdUser/:StreamingId')
  @HttpCode(200)
  @UserLevel(1)
  async getUserStreaming(
    @Param('IdUser') IdUser: string,
    @Param('StreamingId') StreamingId: string,
  ): Promise<number> {
    return await this.userStreamingService.getCountUserStreaming(
      IdUser,
      parseInt(StreamingId, 10),
    );
  }

  @Delete()
  @HttpCode(200)
  @UserLevel(2)
  async deleteUserStreaming(
    @Body() data: DeleteStreamingUserDto,
  ): Promise<DefaultReturn> {
    return await this.userStreamingService.deleteUserStreamingByiD(
      data,
    );
  }

  @Delete('/:IdUser')
  @HttpCode(200)
  @UserLevel(2)
  async deleteUserStreamingByUser(
    @Param('IdUser') idUser: string,
  ): Promise<DefaultReturn> {
    return await this.userStreamingService.deleteAllUserStreaming(
      idUser,
    );
  }
}
