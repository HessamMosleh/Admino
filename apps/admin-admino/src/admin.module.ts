import { Module } from '@nestjs/common';
import { MongodbModule, SharedModule } from '@app/shared';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [UserModule, MongodbModule, SharedModule, AuthenticationModule],
})
export class AdminModule {}
