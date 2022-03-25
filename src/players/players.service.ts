import { Injectable } from '@nestjs/common';
import { TableMock } from '../mocks/table';
import { MessageStatus } from '../utils/enums';
import { getErrorResponseBody, getSuccessResponseBody } from '../utils/helpers';
import { PlayerMock } from '../mocks/players';
import { PlayerDto } from './dto/player-dto';

@Injectable()
export class PlayersService {
  async getPlayer(id: string) {
    try {
      const player = await this.getPlayerById(id);
      return getSuccessResponseBody(player);
    } catch (e) {
      return getErrorResponseBody(
        TableMock,
        MessageStatus.SOMETHING_WENT_WRONG,
      );
    }
  }
  private async getPlayerById(id: string): Promise<PlayerDto> {
    return PlayerMock;
  }
}
