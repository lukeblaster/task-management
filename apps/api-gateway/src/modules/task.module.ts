import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TaskController } from 'src/presentation/http/controllers/task.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'TASK_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL') as string],
            queue: 'tasks_queue',
          },
        }),
      },
    ]),
  ],
  controllers: [TaskController],
  providers: [],
})
export class TaskModule {}
