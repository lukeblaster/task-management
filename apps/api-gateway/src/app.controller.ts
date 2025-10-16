import {
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SignInDto } from './presentation/http/dto/auth/sign-in';

@Controller('')
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Headers() credential: SignInDto) {
    return await firstValueFrom(this.authClient.send('auth', credential));
  }
}
