import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from './app/config/config.service';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        bufferLogs: true
    });

    const configService = new ConfigService();

    app.enableCors({
        origin: configService.frontendAddress,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true
    });

    app.flushLogs();
    await app.listen(3001, '0.0.0.0');
}

bootstrap();
