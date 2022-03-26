import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BaseResultsBodyDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  won: number;

  @IsNumber()
  @IsNotEmpty()
  lost: number;

  @IsNumber()
  @IsNotEmpty()
  draw: number;

  @IsNumber()
  @IsNotEmpty()
  points: number;
}
