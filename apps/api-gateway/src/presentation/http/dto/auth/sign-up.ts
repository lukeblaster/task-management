import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
