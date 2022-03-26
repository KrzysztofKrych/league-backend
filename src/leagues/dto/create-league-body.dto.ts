import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLeagueBodyDto {
  @IsString()
  @IsNotEmpty()
  season: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
