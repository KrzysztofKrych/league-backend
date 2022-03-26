import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTableBodyDto {
  @IsString()
  @IsNotEmpty()
  season: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
