import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserUseCase } from 'src/app/use-cases/users/create-user.use-case';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import { UserPresenter } from '../presenters/user.presenter';
import { genSalt, hash } from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateUserDto) {
    const { name, email, password } = body;

    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    const { user } = await this.createUserUseCase.execute({
      name: name,
      email: email,
      password: passwordHash,
    });

    return UserPresenter.toHTTP(user);
  }
}
