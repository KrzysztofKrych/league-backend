import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Team {
  _id: string;
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: Array, required: true })
  players: string[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);

export type TeamDocument = Team & Document;
