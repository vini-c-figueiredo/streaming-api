import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerAuthMiddleware } from './swagger.middleware';

export const addSwagger = (app: INestApplication) => {
    app.use('/api', new SwaggerAuthMiddleware().use);

    const config = new DocumentBuilder()
        .setTitle('Api Streaming')
        .setDescription('Doc of Streaming API')
        .setVersion('0.0.01');

    const configBuilded = config.build();
    const document = SwaggerModule.createDocument(app, configBuilded);

    SwaggerModule.setup('api', app, document);
};