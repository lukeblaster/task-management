import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginUseCase } from 'src/app/use-cases/auth/login.use-case';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserService } from 'src/domain/services/user.service';
import { UserTypeOrmEntity } from 'src/infrastructure/database/typeorm/entities/user.typeorm-entity';
import { TypeOrmUserRepository } from 'src/infrastructure/database/typeorm/repositories/user.typeorm-repository';
import { AuthController } from 'src/presentation/http/controllers/auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
    UserService,
  ],
})
export class AuthModule {}
