import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongodbModule, SharedModule } from '@app/shared';

@Module({
  imports: [UserModule, MongodbModule, SharedModule],
})
export class AppModule {}
