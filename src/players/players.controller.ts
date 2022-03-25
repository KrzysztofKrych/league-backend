import { Controller, Get, Param, Res, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { sendResponse } from '../utils/helpers';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getPlayer(@Param() params: { id: string }, @Res() res: Response) {
    const payload = await this.playersService.getPlayer(params.id);
    return sendResponse(res, payload);
  }
}
