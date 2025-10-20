import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCommentUseCase } from 'src/app/use-cases/comment/create-comment.use-case';
import { CommentRepository } from 'src/domain/repositories/comment.repository';
import { CommentTypeOrmEntity } from 'src/infrastructure/database/typeorm/entities/comment.typeorm-entity';
import { TaskTypeOrmEntity } from 'src/infrastructure/database/typeorm/entities/task.typeorm-entity';
import { TypeOrmCommentRepository } from 'src/infrastructure/database/typeorm/repositories/comment.typeorm-repository';
import { CommentController } from 'src/presentation/http/controllers/comment.controller';
import { TaskModule } from './task.module';
import { TaskRepository } from 'src/domain/repositories/task.repository';
import { TypeOrmTaskRepository } from 'src/infrastructure/database/typeorm/repositories/task.typeorm-repository';
import { ReadCommentUseCase } from 'src/app/use-cases/comment/read-comment.use-case';
import { ReadTasksUseCase } from 'src/app/use-cases/task/read-tasks.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentTypeOrmEntity, TaskTypeOrmEntity]),
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
    CreateCommentUseCase,
    ReadCommentUseCase,
    ReadTasksUseCase,
  ],
  exports: [],
})
export class CommentModule {}
