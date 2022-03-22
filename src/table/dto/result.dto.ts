import { IsNotEmpty, IsNumber } from 'class-validator';

export class ResultDto {
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
