import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskTypeOrmEntity } from './infrastructure/database/typeorm/entities/task.typeorm-entity';
import { CommentTypeOrmEntity } from './infrastructure/database/typeorm/entities/comment.typeorm-entity';
import { TaskModule } from './modules/task.module';

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
        schema: 'tasks',
        entities: [__dirname + '/**/*.typeorm-entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([CommentTypeOrmEntity]),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskTypeOrmEntity, CommentTypeOrmEntity],
})
export class AppModule {}
