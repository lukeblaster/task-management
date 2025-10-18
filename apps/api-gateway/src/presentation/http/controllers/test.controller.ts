import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { SignInDto } from '../dto/auth/sign-in';
import { AtAuthGuard } from 'src/domain/guards/at.guard';

@Controller('protected-route')
@UseGuards(AtAuthGuard)
export class TestController {
  constructor() {}

  @HttpCode(HttpStatus.OK)
  @Get('')
  async signUp(@Body() credential: SignInDto) {
    return { message: 'Rota segura acessada com sucesso!' };
  }
}
