import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ResultDto {
  @IsString()
  @IsNotEmpty()
  teamId: string;

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

export class FullResultDto extends ResultDto {
  @IsNumber()
  @IsNotEmpty()
  position: number;
}
