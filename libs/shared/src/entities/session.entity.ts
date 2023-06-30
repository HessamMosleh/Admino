import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
import { User } from '@app/shared/entities/user.entity';

const ObjectId = mongoose.Schema.Types.ObjectId;

export enum PlatformType {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}

@Schema({ timestamps: true })
export class Session extends Document {
  @Prop({ type: ObjectId, ref: User.name, index: true })
  user: User;

  @Prop({ type: String })
  language: string;

  @Prop({ type: String, enum: PlatformType })
  platform: PlatformType;

  @Prop({ type: Number })
  build: number;

  @Prop({ type: String })
  os: string;

  @Prop({ type: String })
  pushToken: string;

  @Prop({ type: Date })
  updatedAt: Date;
}

export class SessionProp {
  static general = ['user', 'platform', 'build', 'os', 'language', 'pushToken'];
}

const SessionSchema = SchemaFactory.createForClass(Session);

export { SessionSchema };
