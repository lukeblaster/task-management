import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { ConfigService } from "@nestjs/config";
import { TaskTypeOrmEntity } from "./infrastructure/database/typeorm/entities/task.typeorm-entity";
import { CommentTypeOrmEntity } from "./infrastructure/database/typeorm/entities/comment.typeorm-entity";
import { AuditLogOrmEntity } from "./infrastructure/database/typeorm/entities/audit-log.typeorm-entity";

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: configService.get<string>("DB_HOST"),
  port: configService.get<number>("DB_PORT"),
  username: configService.get<string>("DB_USERNAME"),
  password: configService.get<string>("DB_PASSWORD"),
  database: configService.get<string>("DB_DATABASE"),
  synchronize: false,
  entities: [TaskTypeOrmEntity, CommentTypeOrmEntity, AuditLogOrmEntity],
  migrationsTransactionMode: "each",
  migrations: ["migrations/*.ts"],
};

export default new DataSource(dataSourceOptions);
