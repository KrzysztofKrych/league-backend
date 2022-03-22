import { Controller, Get, Param, Res, Response } from '@nestjs/common';
import { sendResponse } from '../utils/helpers';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('/:id')
  async getPlayer(@Param() params: { id: string }, @Res() res: Response) {
    const payload = await this.playersService.getPlayer(params.id);
    return sendResponse(res, payload);
  }
}
