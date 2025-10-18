import { Body, Controller } from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/use-cases/users/create-user.use-case';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { UserPresenter } from '../presenters/user.presenter';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @MessagePattern('signup')
  async create(@Body() body: CreateUserDto) {
    const { username, email, password } = body;

    const { user } = await this.createUserUseCase.execute({
      username: username,
      email: email,
      password: password,
    });

    return UserPresenter.toHTTP(user);
  }
}
