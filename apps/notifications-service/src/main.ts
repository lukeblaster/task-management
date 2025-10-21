import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'notifications_queue',
        queueOptions: { durable: false },
      },
    },
  );

  await app.listen();
  Logger.log(
    '🔔 Notifications microservice is listening on RabbitMQ queue: notifications_queue',
  );
}
bootstrap();
