import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`${process.env.RABBITMQ_URL!}`],
      queue: "tasks_queue",
    },
  });

  await app.startAllMicroservices();
  await app.listen(3003);
  Logger.log(
    "🔐 Tasks microservice is listening on RabbitMQ queue: tasks_queue"
  );
}
bootstrap();
