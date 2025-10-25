import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { UserTypeOrmEntity } from './infrastructure/database/typeorm/entities/user.typeorm-entity';

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
  entities: [UserTypeOrmEntity],
  migrationsTransactionMode: 'each',
  migrations: ['migrations/*.ts'],
};

export default new DataSource(dataSourceOptions);
