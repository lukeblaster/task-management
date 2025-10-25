import { DataSource, DataSourceOptions } from 'typeorm';
import { NotificationTypeOrmEntity } from './infrastructure/database/typeorm/entities/notification.typeorm-entity';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  synchronize: false,
  entities: [NotificationTypeOrmEntity],
  migrationsTransactionMode: 'each',
  migrations: ['migrations/*.ts'],
};

export default new DataSource(dataSourceOptions);
