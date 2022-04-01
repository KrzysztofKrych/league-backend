import {
    Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { sendResponse } from '../utils/helpers';
import { CreateTeamBodyDto } from './dto/create-team-body.dto';
import { TeamsService } from './teams.service';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getLeague(@Param() params: { id: string }, @Res() res: Response) {
    const payload = await this.teamsService.getTeam(params.id);
    return sendResponse(res, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createLeague(@Body() body: CreateTeamBodyDto, @Res() res: Response) {
    const payload = await this.teamsService.handleCreateTeam(body);
    return sendResponse(res, payload);
  }

}
