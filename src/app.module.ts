import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/JWT-auth.guard';
import { crudModules } from './CRUD';
import { UserLevelGuard } from './global/guards/user-level.guard';
import { PrismaService } from './global/prisma/prisma.service';

@Module({
  imports: [...crudModules, AuthModule],
  controllers: [],
  providers: [PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: UserLevelGuard,
    },
  ],
})
export class AppModule { }
