import { Injectable } from '@nestjs/common';
import { TableMock } from '../mocks/table';
import { MessageStatus } from '../utils/enums';
import { getErrorResponseBody, getSuccessResponseBody } from '../utils/helpers';

@Injectable()
export class TableService {
  async getTable(id: string) {
    try {
      return getSuccessResponseBody(TableMock);
    } catch (e) {
      return getErrorResponseBody(
        TableMock,
        MessageStatus.SOMETHING_WENT_WRONG,
      );
    }
  }
}
