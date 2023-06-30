import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationJwtService } from '@app/shared/services/authentication-jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from '@app/shared/entities/session.entity';
import { SessionService } from '@app/shared/services/session.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Session.name,
        schema: SessionSchema,
      },
    ]),
  ],
  providers: [AuthenticationJwtService, SessionService],
  exports: [SessionService],
})
export class AuthenticationModule {}
