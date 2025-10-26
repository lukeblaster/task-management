import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { AtAuthGuard } from 'src/domain/guards/at.guard';
import { AtJwtStrategy } from 'src/domain/strategies/at.strategy';
import { RtStrategy } from 'src/domain/strategies/rt.strategy';
import { AuthController } from 'src/presentation/http/controllers/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // garante acesso ao ConfigService em qualquer lugar
      envFilePath: '.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL') as string],
            queue: 'auth_queue',
          },
        }),
      },
    ]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AtAuthGuard, AtJwtStrategy, RtStrategy],
})
export class AuthModule {}
