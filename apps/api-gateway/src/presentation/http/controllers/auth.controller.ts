import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import type { Response } from 'express';
import { SignInDto } from '../dto/auth/sign-in';
import { RtAuthGuard } from 'src/domain/guards/rt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('list')
  async listUsers() {
    const response = await firstValueFrom(this.authClient.send('list', {}));

    return response;
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Headers() credential: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await firstValueFrom(
      this.authClient.send('auth.login', credential),
    );

    if (!response.access_token) {
      throw new HttpException(response.error, HttpStatus.UNAUTHORIZED);
    }

    res.cookie('access_token', response.access_token, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
    });

    res.cookie('refresh_token', response.refresh_token, {
      httpOnly: true,
      secure: true,
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
    return { message: 'Usuário criado com sucesso.' };
  }

  @UseGuards(RtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('refresh')
  async refreshTokens(@Req() req, @Res({ passthrough: true }) res) {
    res.cookie('access_token', req.user.access_token, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
    });

    res.cookie('refresh_token', req.user.refresh_token, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'none',
    });

    Logger.debug('Tokens renovados com sucesso.');

    return { message: 'Tokens renovados com sucesso.' };
  }
}
