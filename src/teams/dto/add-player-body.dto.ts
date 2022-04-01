import { IsNotEmpty, IsString } from 'class-validator';

export class AddPlayerBodyDto {
  @IsString()
  @IsNotEmpty()
  teamId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
