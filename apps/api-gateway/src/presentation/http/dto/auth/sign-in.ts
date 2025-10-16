import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(55)
  password: string;
}
