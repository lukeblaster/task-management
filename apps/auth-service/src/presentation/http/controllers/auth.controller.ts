import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthHeaders } from '../decorators/headers.decorators';
import { AuthHeadersDto } from '../dtos/auth/auth-headers.dto';
import { LoginUseCase } from 'src/app/use-cases/auth/login.use-case';
import { ValidateTokenUseCase } from 'src/app/use-cases/auth/validate-token.use-case';
import { DecodeTokenUseCase } from 'src/app/use-cases/auth/decode-token.use-case';
import { RefreshTokenUseCase } from 'src/app/use-cases/auth/refresh-tokens.use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly validateTokenUseCase: ValidateTokenUseCase,
    private readonly decodeTokenUseCase: DecodeTokenUseCase,
    private readonly refreshTokensUseCase: RefreshTokenUseCase,
  ) {}

  @MessagePattern('auth.login')
  async signIn(@AuthHeaders() credentials: AuthHeadersDto) {
    const { user, access_token, refresh_token } =
      await this.loginUseCase.execute({
        email: credentials.email,
        password: credentials.password,
      });

    return { user, access_token, refresh_token };
  }

  @MessagePattern('auth.validate')
  async validateToken(@Payload() header: { token: string }) {
    const payload = await this.validateTokenUseCase.execute({
      token: header.token,
    });

    if (!payload) {
      return { success: false, error: 'Token inválido' };
    }
    return { success: true, payload, type: 'access_token' };
  }

  @MessagePattern('auth.decode')
  async decodeToken(@Payload() data: any) {
    const payload = await this.decodeTokenUseCase.execute(data.token);
    return { success: true, data: payload };
  }

  @MessagePattern('auth.refresh')
  async refreshTokens(@Payload() data: any) {
    const response = await this.refreshTokensUseCase.execute({
      refreshToken: data.token,
    });

    if (!response.tokens) {
      return { success: false, error: 'Token inválido' };
    }
    return {
      success: true,
      tokens: response.tokens,
      userData: response.userData,
    };
  }
}
