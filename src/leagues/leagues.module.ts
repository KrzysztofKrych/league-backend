import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { League, LeagueSchema } from './mongo';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { TeamsModule } from '../teams/teams.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: League.name, schema: LeagueSchema }]),
    TeamsModule
  ],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeagueModule {}
