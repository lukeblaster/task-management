import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
