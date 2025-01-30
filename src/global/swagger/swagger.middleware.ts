import { Injectable, NestMiddleware } from '@nestjs/common';
import * as basicAuth from 'basic-auth';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SwaggerAuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const user = basicAuth(req);

        const validUser = process.env.SWAGGER_USER || 'admin';
        const validPass = process.env.SWAGGER_PASSWORD || 'admin';

        if (!user || user.name !== validUser || user.pass !== validPass) {
            res.set('WWW-Authenticate', 'Basic realm="Swagger"');
            return res.status(401).send('Authentication required.');
        }

        next();
    }
}