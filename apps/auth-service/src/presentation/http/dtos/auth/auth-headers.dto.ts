import { IsString, IsNotEmpty } from 'class-validator';

export class AuthHeadersDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
