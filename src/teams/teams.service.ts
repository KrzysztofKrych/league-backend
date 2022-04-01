import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessageStatus } from '../utils/enums';
import { getErrorResponseBody, getSuccessResponseBody } from '../utils/helpers';
import { CreateTeamBodyDto } from './dto/create-team-body.dto';
import { TeamDto } from './dto/team.dto';
import { Team, TeamDocument } from './mongo';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name)
    private readonly TeamModel: Model<TeamDocument>,
  ) {}

  async getTeam(id: string) {
    try {
      const league = await this.getTeamByIdLean(id);
      return getSuccessResponseBody(league);
    } catch (error) {
      return getErrorResponseBody(error, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  async handleCreateTeam(body: CreateTeamBodyDto){
    try {
      const team = await this.createTeam(body);
      if(team){
        return getSuccessResponseBody(team);
      }
      return getErrorResponseBody(
        { message: 'cannot create team.' },
        MessageStatus.SOMETHING_WENT_WRONG,
      );
    } catch (error) {
      return getErrorResponseBody(error, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }


  async createTeam(
    body: CreateTeamBodyDto,
  ): Promise<TeamDto | null> {
    const newLeague = new this.TeamModel({ ...body, players: body.players ? body.players : [] });
    const result = await newLeague.save();
    if (result) {
      return new TeamDto(result.toObject());
    }
    return null;
  }


  async getTeamByIdLean(_id: string): Promise<TeamDocument> {
    return await this.TeamModel.findOne({ _id }).lean();
  }

  async findOne(_id: string): Promise<TeamDocument> {
    return await this.TeamModel.findOne({ _id });
  }
}
