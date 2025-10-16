import { Body, Controller } from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/use-cases/users/create-user.use-case';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { UserPresenter } from '../presenters/user.presenter';
import { genSalt, hash } from 'bcrypt';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @MessagePattern('signup')
  async create(@Body() body: CreateUserDto) {
    const { username, email, password } = body;

    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    const { user } = await this.createUserUseCase.execute({
      username: username,
      email: email,
      password: passwordHash,
    });

    return UserPresenter.toHTTP(user);
  }
}
