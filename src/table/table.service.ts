import { Injectable } from '@nestjs/common';
import { TableMock } from '../mocks/table';
import { MessageStatus } from '../utils/enums';
import { getErrorResponseBody, getSuccessResponseBody } from '../utils/helpers';
import { TableItemDto } from './dto/table-item.dto';

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

  private async getTableById(id: string): Promise<TableItemDto[]>{
    return TableMock;
  }
}
