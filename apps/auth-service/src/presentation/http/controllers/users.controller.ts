import { Body, Controller, ForbiddenException } from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/use-cases/users/create-user.use-case';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { UserPresenter } from '../presenters/user.presenter';
import { MessagePattern } from '@nestjs/microservices';
import { ReadUserUseCase } from 'src/app/use-cases/users/read-user.use-case';

@Controller()
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly readUserUseCase: ReadUserUseCase,
  ) {}

  @MessagePattern('signup')
  async create(@Body() body: CreateUserDto) {
    const { username, email, password } = body;
    console.log(body);

    if (!email) throw new ForbiddenException();

    const { user } = await this.createUserUseCase.execute({
      username: username,
      email: email,
      password: password,
    });

    return UserPresenter.toHTTP(user);
  }

  @MessagePattern('list')
  async readAllUsers() {
    const users = await this.readUserUseCase.execute();

    const formattedUsers = users?.map((user) => UserPresenter.toHTTP(user));

    return formattedUsers;
  }
}
