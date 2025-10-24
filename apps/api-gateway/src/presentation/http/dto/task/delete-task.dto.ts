import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeleteTaskDto {
  @ApiProperty()
  @IsString()
  id: string;
}
