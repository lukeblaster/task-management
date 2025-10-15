import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './presentation/http/dtos/auth/login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('auth')
  async signIn(@Payload() credential: LoginDto) {
    console.log('📩 Mensagem recebida no Auth microservice:', credential);
    return credential;
  }
}
