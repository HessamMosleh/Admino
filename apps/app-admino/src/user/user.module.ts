import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule, User, UserSchema } from '@app/shared';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    AuthenticationModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
