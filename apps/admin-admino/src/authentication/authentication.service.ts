import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SessionService, SharedService } from '@app/shared';
import { LoginUserDto } from '@app/shared/dtos/login-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  async loginByUserPass(dto: LoginUserDto) {
    let user = await this.userService.findUser(
      { email: dto.email },
      '+password',
    );

    if (
      !user ||
      !user.password ||
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      !(await user.correctPassword(dto.password, user.password))
    )
      throw new UnauthorizedException('Incorrect username or password');

    const { session, accessToken } =
      await this.sessionService.createSessionToken(user._id, dto);
    user = user.toObject();
    delete user.password;
    delete user.roles;
    return SharedService.ResponseResult({ session, user, accessToken });
  }
}
