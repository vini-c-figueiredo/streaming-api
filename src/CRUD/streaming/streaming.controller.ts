import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserLevel } from 'src/global/decorators/user-level.decorator';
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
  async CreateStreaming(
    @Body() createStreamingDTO: CreateStreamingDTO,
  ): Promise<{ message: string }> {
    return await this.streamingService.createStreaming(createStreamingDTO);
  }

  @Get()
  @HttpCode(200)
  @UserLevel(1)
  async getAllStreaming(): Promise<ReturnStreamingDTO[]> {
    return await this.streamingService.getAllStreaming();
  }

  @Get(':name')
  @HttpCode(200)
  @UserLevel(1)
  async getStreamingByName(@Param('name') name: string): Promise<ReturnStreamingDTO> {
    return await this.streamingService.getStreamingByName(name);
  }

  @Patch(':name')
  @HttpCode(200)
  @UserLevel(2)
  async UpdateStreamingPrice(
    @Param('name') name: string,
    @Body() Price: number,
  ): Promise<ReturnStreamingDTO> {
    return await this.streamingService.updateStreamingPrice(name, Price);
  }

  @Delete(':name')
  @HttpCode(200)
  @UserLevel(2)
  async deleteStreamingByName(@Param('name') name: string): Promise<{ message: string }> {
    return await this.streamingService.deleteStreamingByName(name);
  }
}
