import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface DecodeTokenUseCaseRequest {
  token: string;
}

export interface DecodeTokenUseCaseResponse {
  tokenDecoded?: string;
}

@Injectable()
export class DecodeTokenUseCase {
  constructor(private readonly jwtService: JwtService) {}

  async execute({
    token,
  }: DecodeTokenUseCaseRequest): Promise<DecodeTokenUseCaseResponse> {
    try {
      return await this.jwtService.decode(token);
    } catch (error) {
      return {};
    }
  }
}
