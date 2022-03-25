import { IsNotEmpty, IsString } from 'class-validator';
import { UserResponseDto } from './user-response.dto';

export class UserDto extends UserResponseDto {
  @IsString()
  @IsNotEmpty()
  password: string;
}
