import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessageStatus } from '../utils/enums';
import { getErrorResponseBody, getSuccessResponseBody } from '../utils/helpers';
import { League, LeagueDocument } from './mongo';
import { Model } from 'mongoose';
import { FullResultDto, ResultDto } from './dto/result.dto';
import { CreateLeagueBodyDto } from './dto/create-league-body.dto';
import { BaseResultsBodyDto } from './dto/base-results-body.dto';
import { LeagueDto } from './dto/league.dto';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectModel(League.name)
    private readonly LeagueModel: Model<LeagueDocument>,
  ) {}

  async getLeague(id: string) {
    try {
      const league = await this.getLeagueByIdLean(id);
      return getSuccessResponseBody(league);
    } catch (error) {
      return getErrorResponseBody(error, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  async handleCreateLeague(body: CreateLeagueBodyDto) {
    try {
      const league = await this.createLeague(body);
      if (league) {
        return getSuccessResponseBody(league);
      }
      return getErrorResponseBody(
        { message: 'cannot update result' },
        MessageStatus.SOMETHING_WENT_WRONG,
      );
    } catch (error) {
      return getErrorResponseBody(error, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  async handleAddResults(body: BaseResultsBodyDto) {
    try {
      const league = await this.addLeagueResults(body);
      if (league) {
        return getSuccessResponseBody(league);
      }
      return getErrorResponseBody(
        { message: 'cannot add new result' },
        MessageStatus.SOMETHING_WENT_WRONG,
      );
    } catch (error) {
      return getErrorResponseBody(error, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  async handleUpdateResults(body: BaseResultsBodyDto) {
    try {
      const league = await this.updateLeagueResults(body);
      return getSuccessResponseBody(league);
    } catch (error) {
      return getErrorResponseBody(error, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  async createLeague(
    body: CreateLeagueBodyDto,
  ): Promise<LeagueDto<ResultDto> | null> {
    const newLeague = new this.LeagueModel({ ...body, results: [] });
    const result = await newLeague.save();
    if (result) {
      return new LeagueDto<ResultDto>(result.toObject());
    }
    return null;
  }

  async updateLeagueResults({
    id,
    draw,
    lost,
    points,
    won,
    teamId,
  }: BaseResultsBodyDto): Promise<LeagueDto<ResultDto> | null> {
    const existingLeague = await this.findOne(id);
    if (existingLeague) {
      const results = existingLeague.results.map((result) => {
        if (result.teamId === teamId) {
          return {
            ...result,
            draw,
            lost,
            points,
            won,
          };
        }
        return result;
      });
      existingLeague.results = results;
      await existingLeague.save();
      return new LeagueDto<ResultDto>(existingLeague.toObject());
    }
    return null;
  }

  async addLeagueResults({
    id,
    draw,
    lost,
    points,
    won,
    teamId,
  }: BaseResultsBodyDto): Promise<LeagueDto<ResultDto> | null> {
    const existingLeague = await this.findOne(id);
    if (existingLeague) {
      const existResultTeam = existingLeague.results.some(
        (result) => result.teamId === teamId,
      );
      if (!existResultTeam) {
        const results = [
          ...existingLeague.results,
          { draw, lost, points, won, teamId },
        ];
        existingLeague.results = results;
        await existingLeague.save();
        return new LeagueDto<ResultDto>(existingLeague.toObject());
      }
    }
    return null;
  }

  calculatePositions(league: LeagueDto<ResultDto>): LeagueDto<FullResultDto> {
    const sortedByPoints = league.results.sort(
      (first, second) => second.points - first.points,
    );

    const calculatedPositions = sortedByPoints.map((league, index, source) => {
      const positionBasedOnPoints =
        source.filter(
          (sourceValue, sourceIndex) =>
            sourceIndex !== index && sourceValue.points > league.points,
        ).length + 1;
      return {
        ...league,
        position: positionBasedOnPoints,
      };
    });
    return {
      ...league,
      results: calculatedPositions,
    };
  }

  async getLeagueByIdLean(_id: string): Promise<LeagueDto<FullResultDto>> {
    const league = await this.LeagueModel.findOne({ _id }).lean();
    if (league) {
      return this.calculatePositions(league);
    }
    return null;
  }
  async findOne(_id: string): Promise<LeagueDocument> {
    return await this.LeagueModel.findOne({ _id });
  }
}
