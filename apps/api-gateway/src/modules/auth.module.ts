import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AtAuthGuard } from 'src/domain/guards/at.guard';
import { AtJwtStrategy } from 'src/domain/strategies/at.strategy';
import { RtStrategy } from 'src/domain/strategies/rt.strategy';
import { AuthController } from 'src/presentation/http/controllers/auth.controller';

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
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AtAuthGuard, AtJwtStrategy, RtStrategy],
})
export class AuthModule {}
