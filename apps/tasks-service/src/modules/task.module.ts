import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskUseCase } from 'src/app/use-cases/task/create-tasks.use-case';
import { DeleteTaskUseCase } from 'src/app/use-cases/task/delete-tasks.use-case';
import { ReadTaskUseCase } from 'src/app/use-cases/task/read-task.use-case';
import { ReadTasksUseCase } from 'src/app/use-cases/task/read-tasks.use-case';
import { UpdateTaskUseCase } from 'src/app/use-cases/task/update-tasks.use-case';
import { TaskRepository } from 'src/domain/repositories/task.repository';
import { TaskTypeOrmEntity } from 'src/infrastructure/database/typeorm/entities/task.typeorm-entity';
import { TypeOrmTaskRepository } from 'src/infrastructure/database/typeorm/repositories/task.typeorm-repository';
import { TaskController } from 'src/presentation/http/controllers/task.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TaskTypeOrmEntity])],
  controllers: [TaskController],
  providers: [
    TaskTypeOrmEntity,
    {
      provide: TaskRepository,
      useClass: TypeOrmTaskRepository,
    },
    CreateTaskUseCase,
    UpdateTaskUseCase,
    ReadTaskUseCase,
    ReadTasksUseCase,
    DeleteTaskUseCase,
  ],
  exports: [],
})
export class TaskModule {}
