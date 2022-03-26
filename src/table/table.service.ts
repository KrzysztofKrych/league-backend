import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MessageStatus } from '../utils/enums';
import { getErrorResponseBody, getSuccessResponseBody } from '../utils/helpers';
import { TableDto } from './dto/table.dto';
import { Table, TableDocument } from './mongo';
import { Model } from 'mongoose';
import { FullResultDto, ResultDto } from './dto/result.dto';
import { CreateTableBodyDto } from './dto/create-table-body.dto';
import { BaseResultsBodyDto } from './dto/base-results-body.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectModel(Table.name)
    private readonly TableModel: Model<TableDocument>,
  ) {}

  async getTable(id: string) {
    try {
      const table = await this.getTableByIdLean(id);
      return getSuccessResponseBody(table);
    } catch (error) {
      return getErrorResponseBody(error, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  async handleCreateTable(body: CreateTableBodyDto) {
    try {
      const table = await this.createTable(body);
      if (table) {
        return getSuccessResponseBody(table);
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
      const table = await this.addTableResults(body);
      if (table) {
        return getSuccessResponseBody(table);
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
      const table = await this.updateTableResults(body);
      return getSuccessResponseBody(table);
    } catch (error) {
      return getErrorResponseBody(error, MessageStatus.SOMETHING_WENT_WRONG);
    }
  }

  async createTable(
    body: CreateTableBodyDto,
  ): Promise<TableDto<ResultDto> | null> {
    const newTable = new this.TableModel({ ...body, results: [] });
    const result = await newTable.save();
    if (result) {
      return new TableDto<ResultDto>(result.toObject());
    }
    return null;
  }

  async updateTableResults({
    id,
    draw,
    lost,
    points,
    won,
    name,
  }: BaseResultsBodyDto): Promise<TableDto<ResultDto> | null> {
    const existingTable = await this.findOne(id);
    if (existingTable) {
      const results = existingTable.results.map((result) => {
        if (result.name === name) {
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
      existingTable.results = results;
      await existingTable.save();
      return new TableDto<ResultDto>(existingTable.toObject());
    }
    return null;
  }

  async addTableResults({
    id,
    draw,
    lost,
    points,
    won,
    name,
  }: BaseResultsBodyDto): Promise<TableDto<ResultDto> | null> {
    const existingTable = await this.findOne(id);
    if (existingTable) {
      const existResultName = existingTable.results.some(
        (result) => result.name === name,
      );
      if (!existResultName) {
        const results = [
          ...existingTable.results,
          { draw, lost, points, won, name },
        ];
        existingTable.results = results;
        await existingTable.save();
        return new TableDto<ResultDto>(existingTable.toObject());
      }
    }
    return null;
  }

  calculatePositions(table: TableDto<ResultDto>): TableDto<FullResultDto> {
    const sortedByPoints = table.results.sort(
      (first, second) => second.points - first.points,
    );

    const calculatedPositions = sortedByPoints.map((table, index, source) => {
      const positionBasedOnPoints =
        source.filter(
          (sourceValue, sourceIndex) =>
            sourceIndex !== index && sourceValue.points > table.points,
        ).length + 1;
      return {
        ...table,
        position: positionBasedOnPoints,
      };
    });
    return {
      ...table,
      results: calculatedPositions,
    };
  }

  async getTableByIdLean(_id: string): Promise<TableDto<FullResultDto>> {
    const table = await this.TableModel.findOne({ _id }).lean();
    if (table) {
      return this.calculatePositions(table);
    }
    return null;
  }
  async findOne(_id: string): Promise<TableDocument> {
    return await this.TableModel.findOne({ _id });
  }
}
