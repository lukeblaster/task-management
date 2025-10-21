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
      urls: ['amqp://admin:admin@localhost:5672'],
      queue: 'notifications_queue',
      queueOptions: { durable: false },
    },
  });

  await app.use(cookieParser.default());
  await app.startAllMicroservices();
  await app.listen(3005);

  Logger.log(
    '🔔 Notifications microservice is listening on RabbitMQ queue: notifications_queue',
  );
}
bootstrap();
