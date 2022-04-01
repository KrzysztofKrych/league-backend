import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTeamBodyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  players: string[];
}
