import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPresenter } from 'src/presentation/http/presenters/user.presenter';
import { JwtService } from '@nestjs/jwt';

export interface ValidateTokenUseCaseRequest {
  token: string;
}

export interface ValidateTokenUseCaseResponse {
  response?: string;
}

@Injectable()
export class ValidateTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute({
    token,
  }: ValidateTokenUseCaseRequest): Promise<ValidateTokenUseCaseResponse> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (typeof payload !== 'object' || !payload.sub)
        throw new UnauthorizedException();

      return { response: payload };
    } catch (error) {
      return {};
    }
  }
}
