import { IsString, MaxLength, ValidateNested } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MaxLength(200)
  content: string;
}
