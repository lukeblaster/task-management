import { IsArray, IsDate, IsString, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  @MaxLength(200)
  description: string;

  @IsDate()
  deadline: Date;

  @IsArray()
  responsibles: Array<string>;
}
