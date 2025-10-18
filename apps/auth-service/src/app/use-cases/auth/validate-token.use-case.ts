import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPresenter } from 'src/presentation/http/presenters/user.presenter';
import { JwtService } from '@nestjs/jwt';

export interface ValidateTokenUseCaseRequest {
  token: string;
}

export interface ValidateTokenUseCaseResponse {
  payload?: string;
}

@Injectable()
export class ValidateTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute({
    token,
  }: ValidateTokenUseCaseRequest): Promise<ValidateTokenUseCaseResponse> {
    try {
      const payload = await this.jwtService.verifyAsync(token);

      if (typeof payload !== 'object' || !payload.sub)
        throw new UnauthorizedException();

      return payload;
    } catch (error) {
      return {};
    }
  }
}
