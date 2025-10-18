import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser.default());

  app.enableCors();

  await app.listen(process.env.PORT ?? 3001);

  Logger.log('🚪 API Gateway rodando na porta 3001');
}
bootstrap();
