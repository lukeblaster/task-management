import { IsString, MaxLength, ValidateNested } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  userId: string;

  @IsString()
  @MaxLength(200)
  content: string;

  @IsString()
  taskId: string;
}
