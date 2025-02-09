import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLevel } from 'src/global/decorators/user-level.decorator';
import { DefaultReturn } from 'src/global/types/defaultreturn';
import { CreateStreamingDTO } from './dto/create-streaming.dto';
import { ReturnStreamingDTO } from './dto/return-streaming.dto';
import { StreamingService } from './streaming.service';

@Controller('streaming')
@ApiTags('streaming')
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) { }

  @Post()
  @HttpCode(201)
  @UserLevel(2)
  async createStreaming(
    @Body() createStreamingDTO: CreateStreamingDTO,
  ): Promise<DefaultReturn> {
    return await this.streamingService.createStreaming(createStreamingDTO);
  }

  @Get()
  @HttpCode(200)
  @UserLevel(1)
  async getUsers(@Query('name') name?: string, @Query('id') id?: number): Promise<ReturnStreamingDTO | ReturnStreamingDTO[] | null> {
    if (name && id) {
      throw new HttpException('You must provide either an email or an id, not both.', HttpStatus.BAD_REQUEST);
    }

    if (name) {
      return await this.streamingService.getStreamingByName(name)
    };
    if (id) {
      return await this.streamingService.getStreamingById(id)
    };

    return await this.streamingService.getAllStreaming();
  }

  @Patch(':name')
  @HttpCode(200)
  @UserLevel(2)
  async updateStreamingPrice(
    @Param('name') name: string,
    @Body() Price: number,
  ): Promise<ReturnStreamingDTO> {
    return await this.streamingService.updateStreamingPrice(name, Price);
  }

  @Delete(':name')
  @HttpCode(200)
  @UserLevel(2)
  async deleteStreamingByName(@Param('name') name: string): Promise<DefaultReturn> {
    return await this.streamingService.deleteStreamingByName(name);
  }
}
