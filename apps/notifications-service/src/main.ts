import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`${process.env.RABBITMQ_URL!}`],
      queue: 'notifications_queue',
    },
  });

  app.use(cookieParser.default());
  app.enableCors({
    origin: `${process.env.FRONTEND_URL!}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  await app.startAllMicroservices();
  await app.listen(3004);

  Logger.log(
    '🔔 Notifications microservice is listening on RabbitMQ queue: notifications_queue',
  );
}
bootstrap();
