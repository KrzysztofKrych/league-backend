import {
  Controller,
  Get,
  Param,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { sendResponse } from '../utils/helpers';
import { TableService } from './table.service';

@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getTable(@Param() params: { id: string }, @Res() res: Response) {
    const payload = await this.tableService.getTable(params.id);
    return sendResponse(res, payload);
  }
}
