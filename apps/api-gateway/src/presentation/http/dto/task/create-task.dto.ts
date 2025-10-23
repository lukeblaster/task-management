import {
  IsArray,
  IsDate,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { EnumStatus, TaskPriority } from 'src/type/tasks.enum';

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

  @IsEnum(EnumStatus)
  @IsOptional()
  status?: EnumStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;
}
