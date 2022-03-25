import {
  Controller,
  Get,
  Param,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { sendResponse } from '../utils/helpers';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getUser(@Param() params: { id: string }, @Res() res: Response) {
    const payload = await this.usersService.getUser(params.id);
    return sendResponse(res, payload);
  }
}
