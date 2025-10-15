import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserUseCase } from 'src/app/use-cases/users/create-user.use-case';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UserService } from 'src/domain/services/user.service';
import { UserTypeOrmEntity } from 'src/infrastructure/database/typeorm/entities/user.typeorm-entity';
import { TypeOrmUserRepository } from 'src/infrastructure/database/typeorm/repositories/user.typeorm-repository';
import { UsersController } from 'src/presentation/http/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeOrmEntity])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UserService,
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [],
})
export class UserModule {}
