import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './modules/auth.module';
import { TaskModule } from './modules/task.module';

@Module({
  imports: [AuthModule, TaskModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
