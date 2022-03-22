import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { ResultDto } from './result.dto';

export class TableItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

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

export class FullTableItemDto extends TableItemDto {
  @IsNumber()
  @IsNotEmpty()
  position: number;
}
