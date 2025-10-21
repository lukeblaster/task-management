import {
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  @MaxLength(100)
  @IsOptional()
  body: string;

  @IsString()
  userId: string;

  @IsString()
  taskId: string;
}
