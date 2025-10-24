import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  @MaxLength(200)
  description: string;

  @ApiProperty()
  @IsDate()
  deadline: Date;

  @ApiProperty()
  @IsArray()
  responsibles: Array<string>;

  @ApiProperty()
  @IsEnum(EnumStatus)
  @IsOptional()
  status?: EnumStatus;

  @ApiProperty()
  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;
}
