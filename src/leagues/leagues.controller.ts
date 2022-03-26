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
import { BaseResultsBodyDto } from './dto/base-results-body.dto';
import { CreateLeagueBodyDto } from './dto/create-league-body.dto';
import { LeaguesService } from './leagues.service';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getLeague(@Param() params: { id: string }, @Res() res: Response) {
    const payload = await this.leaguesService.getLeague(params.id);
    return sendResponse(res, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createLeague(@Body() body: CreateLeagueBodyDto, @Res() res: Response) {
    const payload = await this.leaguesService.handleCreateLeague(body);
    return sendResponse(res, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add-results')
  async addResults(@Body() body: BaseResultsBodyDto, @Res() res: Response) {
    const payload = await this.leaguesService.handleAddResults(body);
    return sendResponse(res, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update-results')
  async updateResults(@Body() body: BaseResultsBodyDto, @Res() res: Response) {
    const payload = await this.leaguesService.handleUpdateResults(body);
    return sendResponse(res, payload);
  }
}
