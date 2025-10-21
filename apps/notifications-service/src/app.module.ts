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
        entities: [__dirname + '/**/*.typeorm-entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([NotificationTypeOrmEntity]),
  ],
  controllers: [AppController, NotificationController],
  providers: [
    AppService,
    {
      provide: NotificationRepository,
      useClass: TypeOrmNotificationRepository,
    },
    CreateNotificationUseCase,
  ],
})
export class AppModule {}
