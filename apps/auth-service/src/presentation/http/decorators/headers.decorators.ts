import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { AuthHeadersDto } from '../dtos/auth/auth-headers.dto';

export const AuthHeaders = createParamDecorator(
  async (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const [, hash] = request.authorization?.split(' ') || [' ', ' '];
    const test = Buffer.from(hash, 'base64').toString();
    const [email, password] = Buffer.from(hash, 'base64').toString().split(':');

    const authHeaders = new AuthHeadersDto();
    authHeaders.email = email;
    authHeaders.password = password;

    const errors = await validate(authHeaders);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid headers');
    }

    console.log(authHeaders);

    return authHeaders;
  },
);
