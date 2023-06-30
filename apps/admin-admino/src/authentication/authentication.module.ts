import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';

import * as Share from '@app/shared';

@Module({
  imports: [Share.AuthenticationModule, UserModule],

  providers: [AuthenticationService],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
