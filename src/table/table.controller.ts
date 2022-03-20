import { Controller, Get, Param, Res, Response } from '@nestjs/common';
import { sendResponse } from '../utils/helpers';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get('/:id')
  async getTable(@Param() params: { id: string }, @Res() res: Response) {
    const payload = await this.tableService.getTable(params.id);
    return sendResponse(res, payload);
  }
}
