import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TaskTypeOrmEntity } from './src/infrastructure/database/typeorm/entities/task.typeorm-entity';
import { CommentTypeOrmEntity } from './src/infrastructure/database/typeorm/entities/comment.typeorm-entity';

require('dotenv').config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  schema: 'tasks',
  entities: [TaskTypeOrmEntity, CommentTypeOrmEntity],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  synchronize: false,
});
