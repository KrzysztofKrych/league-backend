import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [TableModule, PlayersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
