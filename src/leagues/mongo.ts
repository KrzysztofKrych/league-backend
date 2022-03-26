import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ResultDto } from './dto/result.dto';

@Schema()
export class League {
  @Prop({ type: String, required: true })
  season: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Object, required: true })
  results: ResultDto[];
}

export const LeagueSchema = SchemaFactory.createForClass(League);

export type LeagueDocument = League & Document;
