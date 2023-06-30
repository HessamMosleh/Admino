import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedService } from '../services/shared.service';
import { PassportModule } from '@nestjs/passport';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [SharedService],
  exports: [SharedService, PassportModule],
})
export class SharedModule {}
