import { Module } from '@nestjs/common';
import { crudModules } from './CRUD';
import { PrismaService } from './prisma.service';

@Module({
  imports: [...crudModules],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
