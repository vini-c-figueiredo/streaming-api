import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/CRUD/user/user.service';
import { ReqAuthDTO } from './dto/reqAuth.dto';
import { returnTokenDTO } from './dto/returnToken.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<ReqAuthDTO> {
        const user = await this.usersService.getUserByEmailPassword(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { email, id } = user;
            const response = { email: email, id: id }
            return response;
        }
        throw new UnauthorizedException('Credenciais inválidas');
    }

    async login(user: ReqAuthDTO): Promise<returnTokenDTO> {
        const payload = { email: user.email, sub: user.id };
        return {
            id: user.id,
            access_token: this.jwtService.sign(payload)
        };
    }
}