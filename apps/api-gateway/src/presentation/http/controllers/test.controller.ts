import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { Response } from 'express';
import { SignInDto } from '../dto/auth/sign-in';
import { MicroserviceJwtAuthGuard } from 'src/domain/guards/microservice-jwt.guard';

@Controller('protected-route')
@UseGuards(MicroserviceJwtAuthGuard)
export class TestController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  async signUp(@Body() credential: SignInDto) {
    return { message: 'Rota segura acessada com sucesso!' };
  }
}
