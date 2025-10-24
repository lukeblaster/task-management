import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReadTaskDto {
  @ApiProperty()
  @IsString()
  userId: string;
}
