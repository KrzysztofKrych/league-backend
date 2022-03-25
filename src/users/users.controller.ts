import { Body, Controller, Post, Res, Response } from '@nestjs/common';
import { sendResponse } from '../utils/helpers';
import { RegisterBodyDto } from './dto/register-body.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() body: RegisterBodyDto, @Res() res: Response) {
    const payload = await this.usersService.register(body);
    return sendResponse(res, payload);
  }
}
