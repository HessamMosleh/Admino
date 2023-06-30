import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionProp } from '@app/shared/entities/session.entity';
import { JwtPayload, SharedService, UserProp } from '@app/shared';
import { CreateSessionDto } from '@app/shared/dtos/create-session.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel(Session.name)
    private readonly sessionModel: Model<Session>,
    private readonly jwtService: JwtService,
  ) {}

  async sessionStart(
    sessionID: string = undefined,
    createDto: CreateSessionDto,
  ): Promise<any> {
    const result = {};
    if (sessionID) {
      const foundSession: Session = await this.sessionModel.findByIdAndUpdate(
        sessionID,
        createDto,
        {
          projection: SessionProp.general,
          new: true,
        },
      );
      if (!foundSession) throw new NotFoundException('Session not found');

      result['session'] = foundSession;
    } else result['session'] = await this.sessionModel.create(createDto);

    return SharedService.ResponseResult(result);
  }

  async getSession(sessionID: string): Promise<Session> {
    const foundSession = await this.sessionModel
      .findOne({ _id: sessionID }, SessionProp.general)
      .populate({ path: 'user', select: UserProp.general });
    if (!foundSession) throw new UnauthorizedException('Session not found');

    return foundSession;
  }
  async createSessionToken(
    userid,
    dto: CreateSessionDto,
    sessionID = undefined,
  ) {
    const createSession = new CreateSessionDto();
    createSession['user'] = userid;
    Object.assign(createSession, dto);

    const { result } = await this.sessionStart(sessionID, createSession);

    const payload: JwtPayload = { sessionId: result.session._id };
    const accessToken = await this.jwtService.signAsync(payload);
    return { session: result.session, accessToken };
  }
  async deleteSession(sessionID: string) {
    await this.sessionModel.deleteOne({ _id: sessionID });
  }

  async getUserSessions(userID): Promise<Session[]> {
    return this.sessionModel.find({ user: userID });
  }

  async setPushToken(session: Session, pushToken: string) {
    await session.updateOne({ pushToken });
  }
}
