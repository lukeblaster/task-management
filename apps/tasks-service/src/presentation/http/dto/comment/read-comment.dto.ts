import { IsString } from 'class-validator';

export class ReadCommentsDto {
  @IsString()
  taskId: string;
}
