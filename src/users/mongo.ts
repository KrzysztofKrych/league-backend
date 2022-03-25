import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ type: String, required: true })
  username: string;
  @Prop({ type: String, required: true })
  password: string;
  @Prop({ type: String, required: true })
  email: string;
  @Prop({ type: String })
  teamId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = User & Document;
