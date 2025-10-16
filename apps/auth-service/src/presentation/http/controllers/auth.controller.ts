import {
  Controller,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthHeaders } from '../decorators/headers.decorators';
import { AuthHeadersDto } from '../dtos/auth/auth-headers.dto';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUseCase } from 'src/app/use-cases/auth/login.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @MessagePattern('auth')
  async signIn(@AuthHeaders() credentials: AuthHeadersDto) {
    const { access_token } = await this.loginUseCase.execute({
      email: credentials.email,
      password: credentials.password,
    });

    return { access_token };
  }
}
