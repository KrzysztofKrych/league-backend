import { Injectable } from '@nestjs/common';
import { UserMock } from '../mocks/users';
import { MessageStatus } from '../utils/enums';
import { getErrorResponseBody, getSuccessResponseBody } from '../utils/helpers';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  async getUser(id: string) {
    try {
      const user = await this.getUserById(id);
      return getSuccessResponseBody(user);
    } catch (e) {
      return getErrorResponseBody(UserMock, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  async getUserByName(name: string): Promise<UserDto | null> {
    return UserMock;
  }

  async getUserById(id: string): Promise<UserDto | null> {
    return UserMock;
  }
}
