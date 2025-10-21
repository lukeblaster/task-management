import {
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  body: string;

  @IsString()
  userId: string;

  @IsString()
  taskId: string;

  @IsString()
  resposibleId: string;
}
