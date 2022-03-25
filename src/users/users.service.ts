import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserMock } from '../mocks/users';
import { MessageStatus } from '../utils/enums';
import { getErrorResponseBody, getSuccessResponseBody } from '../utils/helpers';
import { RegisterBodyDto } from './dto/register-body.dto';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './mongo';
import { Model } from 'mongoose';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async getUser(id: string) {
    try {
      const user = await this.getUserById(id);
      return getSuccessResponseBody(user);
    } catch (e) {
      return getErrorResponseBody(UserMock, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  async register(body: RegisterBodyDto) {
    try {
      const isEmailExist = await this.getUserByNameOrEmail(
        body.username,
        body.email,
      );
      if (!isEmailExist) {
        const user = await this.createUser(body);
        return getSuccessResponseBody(user);
      }
      return getErrorResponseBody(
        { message: 'user with this email or name already exists' },
        MessageStatus.SOMETHING_WENT_WRONG,
      );
    } catch (error) {
      return getErrorResponseBody(error, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  private async createUser(
    body: RegisterBodyDto,
  ): Promise<UserResponseDto | null> {
    const newUser = new this.UserModel(body);
    const result = await newUser.save();
    if (result) {
      return new UserResponseDto(result.toObject());
    }
    return null;
  }

  async getUserByEmail(email: string): Promise<UserDto | null> {
    const user = await this.UserModel.findOne({ email });
    if (user) {
      return new UserDto(user.toObject());
    }
    return null;
  }

  async getUserByName(username: string): Promise<UserDto | null> {
    const user = await this.UserModel.findOne({ username });
    if (user) {
      return new UserDto(user.toObject());
    }
    return null;
  }
  async getUserByNameOrEmail(
    username: string,
    email: string,
  ): Promise<UserDto | null> {
    const user = await this.UserModel.findOne({
      $or: [{ username }, { email }],
    });
    if (user) {
      return new UserDto(user.toObject());
    }
    return null;
  }

  async getUserById(_id: string): Promise<UserDto | null> {
    const user = await this.UserModel.findOne({ _id });
    if (user) {
      return new UserDto(user.toObject());
    }
    return null;
  }
}
