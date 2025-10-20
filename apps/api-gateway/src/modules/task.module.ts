import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CommentController } from 'src/presentation/http/controllers/comment.controller';
import { TaskController } from 'src/presentation/http/controllers/task.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'tasks_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [TaskController, CommentController],
  providers: [],
})
export class TaskModule {}
