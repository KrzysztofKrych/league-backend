import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Table, TableSchema } from './mongo';
import { TableController } from './table.controller';
import { TableService } from './table.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]),
  ],
  controllers: [TableController],
  providers: [TableService],
})
export class TableModule {}
