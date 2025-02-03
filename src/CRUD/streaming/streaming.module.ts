import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/global/prisma/prisma.module';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';

@Module({
  imports: [PrismaModule],
  controllers: [StreamingController],
  providers: [StreamingService],
})
export class StreamingModule { }
