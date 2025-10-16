import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MicroserviceJwtAuthGuard } from 'src/domain/guards/microservice-jwt.guard';
import { MicroserviceJwtStrategy } from 'src/domain/strategies/microservice-jwt.strategy';
import { AuthController } from 'src/presentation/http/controllers/auth.controller';
import { TestController } from 'src/presentation/http/controllers/test.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'auth_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [AuthController, TestController],
  providers: [MicroserviceJwtAuthGuard, MicroserviceJwtStrategy],
})
export class AuthModule {}
