import { Module } from '@nestjs/common';
import { StreamingService } from '../streaming/streaming.service';
import { UserService } from '../user/user.service';
import { UserStreamingController } from './user-streaming.controller';
import { UserStreamingService } from './user-streaming.service';

@Module({
  controllers: [UserStreamingController],
  providers: [UserStreamingService, UserService, StreamingService],
})
export class UserStreamingModule { }
