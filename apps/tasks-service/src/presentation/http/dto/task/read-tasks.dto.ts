import { IsString } from 'class-validator';

export class ReadTaskDto {
  @IsString()
  userId: string;
}
