import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, ValidateNested } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  content: string;

  @ApiProperty()
  @IsString()
  authorName: string;
}
