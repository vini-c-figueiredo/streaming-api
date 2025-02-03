import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UserLevelGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredLevel = this.reflector.get<number>('userLevel', context.getHandler());
        if (!requiredLevel) return true;

        const request = context.switchToHttp().getRequest<Request>() as Request & { user: { userLevel: number } };

        const user = request.user;
        if (user.userLevel < requiredLevel) {
            throw new ForbiddenException('Acesso negado. Nível insuficiente.');
        }

        return true;
    }
}