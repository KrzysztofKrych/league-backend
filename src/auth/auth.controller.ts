import { Controller, Post, Request, Res, UseGuards, Response } from '@nestjs/common';
import { sendResponse } from '../utils/helpers';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const payload = await this.authService.login(req.user);
    return sendResponse(res, payload);
  }
}
