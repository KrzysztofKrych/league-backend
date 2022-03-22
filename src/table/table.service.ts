import { Injectable } from '@nestjs/common';
import { TableMock } from '../mocks/table';
import { MessageStatus } from '../utils/enums';
import { getErrorResponseBody, getSuccessResponseBody } from '../utils/helpers';
import { FullTableItemDto, TableItemDto } from './dto/table-item.dto';

@Injectable()
export class TableService {
  async getTable(id: string) {
    try {
      const table = await this.getTableById(id)
      return getSuccessResponseBody(table);
    } catch (e) {
      return getErrorResponseBody(
        TableMock,
        MessageStatus.SOMETHING_WENT_WRONG,
      );
    }
  } 
  calculatePositions(items: TableItemDto[]): FullTableItemDto[] {
    const sortedByPoints = items.sort((first, second) => second.results.points - first.results.points);
    return sortedByPoints.map((table, index, source) => {
      const positionBasedOnPoints = source.filter((sourceValue, sourceIndex) => sourceIndex !== index && sourceValue.results.points > table.results.points).length + 1
      return {
        ...table,
        position:  positionBasedOnPoints
      }
    })
  }

  private async getTableById(id: string): Promise<TableItemDto[]>{
    return this.calculatePositions(TableMock);
  }
}
