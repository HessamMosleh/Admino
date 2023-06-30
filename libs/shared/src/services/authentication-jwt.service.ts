import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Session } from '@app/shared/entities/session.entity';
import { JwtPayload } from '@app/shared/interfaces/jwt-payload.interface';
import { SessionService } from '@app/shared/services/session.service';

@Injectable()
export class AuthenticationJwtService extends PassportStrategy(Strategy) {
  constructor(private readonly sessionService: SessionService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<Session> {
    const { sessionId, iat } = payload;
    const session = await this.sessionService.getSession(sessionId);

    return session;
  }
}
