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
import { CreateTableBodyDto } from './dto/create-table-body.dto';
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

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async createTable(@Body() body: CreateTableBodyDto, @Res() res: Response) {
    const payload = await this.tableService.handleCreateTable(body);
    return sendResponse(res, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/add-results')
  async addResults(@Body() body: BaseResultsBodyDto, @Res() res: Response) {
    const payload = await this.tableService.handleAddResults(body);
    return sendResponse(res, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update-results')
  async updateResults(@Body() body: BaseResultsBodyDto, @Res() res: Response) {
    const payload = await this.tableService.handleUpdateResults(body);
    return sendResponse(res, payload);
  }
}
