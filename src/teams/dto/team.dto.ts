import { Transform } from "class-transformer";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class TeamDto {
  @IsString()
  @IsNotEmpty()
  @Transform((id) => id.value.toString())
  _id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString({ each: true })
  players: string[];

  constructor(partial: Partial<TeamDto>) {
    Object.assign(this, partial);
  }
}