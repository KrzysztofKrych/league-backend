import { IsNotEmpty, IsString } from 'class-validator';

export class PlayerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
