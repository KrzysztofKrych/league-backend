import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestDto } from './dto/login-request.dto';
import { MessageStatus } from '../utils/enums';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserResponseDto | null> {
    const user = await this.usersService.getUserByName(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { username: user.username, sub: user._id };
    return {
      data: {
        access_token: this.jwtService.sign(payload),
      },
      message: MessageStatus.SUCCESS,
    };
  }
}
