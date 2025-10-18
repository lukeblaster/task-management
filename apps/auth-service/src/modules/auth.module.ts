import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DecodeTokenUseCase } from 'src/app/use-cases/auth/decode-token.use-case';
import { LoginUseCase } from 'src/app/use-cases/auth/login.use-case';
import { RefreshTokenUseCase } from 'src/app/use-cases/auth/refresh-tokens.use-case';
import { UpdateRtUseCase } from 'src/app/use-cases/auth/update-rt.use-case';
import { ValidateTokenUseCase } from 'src/app/use-cases/auth/validate-token.use-case';
import { ValidateUserUseCase } from 'src/app/use-cases/auth/validate-user.use-case';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { AuthService } from 'src/domain/services/auth.service';
import { UserService } from 'src/domain/services/user.service';
import { UserTypeOrmEntity } from 'src/infrastructure/database/typeorm/entities/user.typeorm-entity';
import { TypeOrmUserRepository } from 'src/infrastructure/database/typeorm/repositories/user.typeorm-repository';
import { AuthController } from 'src/presentation/http/controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    ValidateUserUseCase,
    ValidateTokenUseCase,
    DecodeTokenUseCase,
    UpdateRtUseCase,
    RefreshTokenUseCase,
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    UserService,
    AuthService,
  ],
})
export class AuthModule {}
