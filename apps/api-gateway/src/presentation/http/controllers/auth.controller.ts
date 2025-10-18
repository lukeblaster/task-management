import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { Response } from 'express';
import { SignInDto } from '../dto/auth/sign-in';
import { RtAuthGuard } from 'src/domain/guards/rt.guard';
import { RtStrategy } from 'src/domain/strategies/rt.strategy';

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
    console.log(credential);
    const response = await firstValueFrom(
      this.authClient.send('auth.login', credential),
    );

    Logger.log(response);

    if (!response.access_token) {
      throw new HttpException(response.error, HttpStatus.UNAUTHORIZED);
    }

    res.cookie('access_token', response.access_token, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'none',
    });

    res.cookie('refresh_token', response.refresh_token, {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'none',
    });

    return { message: 'Login realizado com sucesso.' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() credential: SignInDto) {
    const response = await firstValueFrom(
      this.authClient.send('signup', credential),
    );
    return { message: 'OK' };
  }

  @UseGuards(RtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokens(@Body() body: { refresh_token: string }) {}
}
