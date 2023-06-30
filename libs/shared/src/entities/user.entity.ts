import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as Bcrypt from 'bcrypt';
export enum UserRoles {
  USER = 'user',
  ADMIN = 'admin',
  VIEWER = 'viewer',
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    type: String,
    unique: true,
    required: [true, 'Please provide your email'],
  })
  email: string;
  @Prop({
    type: String,
    select: false,
    required: [true, 'Please provide a password'],
    minlength: 8,
  })
  password: string;
  @Prop({ type: String })
  name: string;
  @Prop({ type: [String], enum: UserRoles, default: UserRoles.USER })
  roles: string[];

  @Prop({ type: Date })
  createdAt: Date;
}
export class UserProp {
  static general = ['roles', 'email', 'name', 'createdAt'];
}
const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await Bcrypt.hash(this.password, 12);

  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await Bcrypt.compare(candidatePassword, userPassword);
};
export { UserSchema };
