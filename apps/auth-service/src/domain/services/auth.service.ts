import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface Tokens {
  access_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jti = crypto.randomUUID();

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          jti,
        },
        {
          secret: process.env.JWT_SECRET_RT,
          expiresIn: '7d',
        },
      ),
    ]);

    return { access_token: at, refresh_token: rt };
  }
}
