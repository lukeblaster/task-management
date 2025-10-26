import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateNotificationUseCase } from './app/use-cases/notification/create-comment.use-case';
import { NotificationRepository } from './domain/repositories/notification.repository';
import { TypeOrmNotificationRepository } from './infrastructure/database/typeorm/repositories/notification.typeorm-repository';
import { NotificationTypeOrmEntity } from './infrastructure/database/typeorm/entities/notification.typeorm-entity';
import { NotificationController } from './presentation/http/controllers/notification.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationsGateway } from './presentation/websocket/gateway/notification.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        schema: 'notifications',
        synchronize: false,
        entities: [__dirname + '/**/*.typeorm-entity{.ts,.js}'],
      }),
    }),
    TypeOrmModule.forFeature([NotificationTypeOrmEntity]),
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
  ],
  controllers: [AppController, NotificationController],
  providers: [
    AppService,
    {
      provide: NotificationRepository,
      useClass: TypeOrmNotificationRepository,
    },
    CreateNotificationUseCase,
    NotificationsGateway,
  ],
})
export class AppModule {}
