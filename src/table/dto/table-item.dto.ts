import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { ResultDto } from './result.dto';

export class TableItemDto {
  @IsNumber()
  @IsNotEmpty()
  teamId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  season: string;

  @IsObject()
  @IsNotEmpty()
  results: ResultDto;
}
