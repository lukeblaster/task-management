import {
  Controller,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthHeaders } from '../decorators/headers.decorators';
import { AuthHeadersDto } from '../dtos/auth/auth-headers.dto';
import { UserService } from 'src/domain/services/user.service';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  @MessagePattern('auth')
  async signIn(@AuthHeaders() credentials: AuthHeadersDto) {
    console.log(credentials);
    const user = await this.userRepository.findByEmail(credentials.email);
    console.log(credentials.email);

    if (!user) throw new ForbiddenException();

    const isPasswordCorrect = compare(user?.password, credentials.password);

    if (!isPasswordCorrect) throw new UnauthorizedException();

    const payload = { sub: user.id, email: user.email };
    const jwt = await this.jwtService.signAsync(payload);

    return { message: 'OK' };
  }
}
