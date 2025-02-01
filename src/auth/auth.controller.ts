import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthRequest } from './dto/reqUser.dto';
import { returnTokenDTO } from './dto/returnToken.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('login')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UseGuards(LocalAuthGuard)
  @IsPublic()
  @HttpCode(200)
  async Login(@Request() req: AuthRequest): Promise<returnTokenDTO> {
    return await this.authService.login(req.user);
  }
}
