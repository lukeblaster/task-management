import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CreateCommentUseCase } from "src/app/use-cases/comment/create-comment.use-case";
import { CommentRepository } from "src/domain/repositories/comment.repository";
import { CommentTypeOrmEntity } from "src/infrastructure/database/typeorm/entities/comment.typeorm-entity";
import { TaskTypeOrmEntity } from "src/infrastructure/database/typeorm/entities/task.typeorm-entity";
import { TypeOrmCommentRepository } from "src/infrastructure/database/typeorm/repositories/comment.typeorm-repository";
import { CommentController } from "src/presentation/http/controllers/comment.controller";
import { TaskModule } from "./task.module";
import { TaskRepository } from "src/domain/repositories/task.repository";
import { TypeOrmTaskRepository } from "src/infrastructure/database/typeorm/repositories/task.typeorm-repository";
import { ReadCommentUseCase } from "src/app/use-cases/comment/read-comment.use-case";
import { ReadTasksUseCase } from "src/app/use-cases/task/read-tasks.use-case";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CreateAuditLogUseCase } from "src/app/use-cases/audit-log/create-audit-log.use-case";
import { AuditLogRepository } from "src/domain/repositories/audit-log.repository";
import { TypeOrmAuditLogRepository } from "src/infrastructure/database/typeorm/repositories/audit-log.typeorm-repository";
import { AuditLogOrmEntity } from "src/infrastructure/database/typeorm/entities/audit-log.typeorm-entity";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: "NOTIFICATION_SERVICE",
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>("RABBITMQ_URL") as string],
            queue: "notifications_queue",
          },
        }),
      },
    ]),

    TypeOrmModule.forFeature([
      CommentTypeOrmEntity,
      TaskTypeOrmEntity,
      AuditLogOrmEntity,
    ]),
    TaskModule,
  ],
  controllers: [CommentController],
  providers: [
    CommentTypeOrmEntity,
    {
      provide: CommentRepository,
      useClass: TypeOrmCommentRepository,
    },
    {
      provide: TaskRepository,
      useClass: TypeOrmTaskRepository,
    },
    {
      provide: AuditLogRepository,
      useClass: TypeOrmAuditLogRepository,
    },
    CreateCommentUseCase,
    ReadCommentUseCase,
    ReadTasksUseCase,
    CreateAuditLogUseCase,
  ],
  exports: [],
})
export class CommentModule {}
