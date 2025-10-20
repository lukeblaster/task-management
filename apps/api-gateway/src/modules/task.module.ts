import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
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
  controllers: [TaskController],
  providers: [],
})
export class TaskModule {}
