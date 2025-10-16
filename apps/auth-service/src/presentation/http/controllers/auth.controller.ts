import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthHeaders } from '../decorators/headers.decorators';
import { AuthHeadersDto } from '../dtos/auth/auth-headers.dto';
import { LoginUseCase } from 'src/app/use-cases/auth/login.use-case';
import { ValidateTokenUseCase } from 'src/app/use-cases/auth/validate-token.use-case';
import { DecodeTokenUseCase } from 'src/app/use-cases/auth/decode-token.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly decodeTokenUseCase: DecodeTokenUseCase,
  ) {}

  @MessagePattern('auth.login')
  async signIn(@AuthHeaders() credentials: AuthHeadersDto) {
    const { access_token } = await this.loginUseCase.execute({
      email: credentials.email,
      password: credentials.password,
    });

    return { access_token };
  }

  @MessagePattern('auth.validate')
  async validateToken(@Payload() header: { token: string }) {
    const payload = await this.validateTokenUseCase.execute({
      token: header.token,
    });

    if (!payload.response) {
      return { success: false, error: 'Token inválido' };
    }
    return { success: true, data: payload };
  }

  @MessagePattern('auth.decode')
  async decodeToken(@Payload() data: any) {
    const payload = await this.decodeTokenUseCase.execute(data.token);
    return { success: true, data: payload };
  }
}
