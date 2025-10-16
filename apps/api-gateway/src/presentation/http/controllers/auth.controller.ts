import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { Response } from 'express';
import { SignInDto } from '../dto/auth/sign-in';

@Controller('')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Headers() credential: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await firstValueFrom(
      this.authClient.send('auth', credential),
    );

    res.cookie('auth', response.access_token, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'none',
    });

    return { message: 'Login realizado com sucesso' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() credential: SignInDto) {
    const response = await firstValueFrom(
      this.authClient.send('signup', credential),
    );
    return { message: 'OK' };
  }
}
