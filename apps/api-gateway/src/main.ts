import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser.default());

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Taskly')
    .setDescription('The Taskly API documentation')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.enableCors({
    origin: process.env.FRONTEND_URL!,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);

  Logger.log('🚪 API Gateway rodando na porta 3001');
}
bootstrap();
