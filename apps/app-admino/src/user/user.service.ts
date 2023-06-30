import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SessionService, SharedService, User } from '@app/shared';
import { Model } from 'mongoose';
import { LoginUserDto } from '@app/shared/dtos/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly sessionService: SessionService,
  ) {}
  async createUser(dto: CreateUserDto) {
    if (dto.password !== dto.confirmPassword)
      throw new BadRequestException(
        'confirmation password not same as inputted password',
      );

    try {
      let user = await this.userModel.create(dto);

      const { session, accessToken } =
        await this.sessionService.createSessionToken(user._id, dto);

      user = user.toObject();
      delete user.password;
      delete user.roles;
      return SharedService.ResponseResult({ session, user, accessToken });
    } catch (e) {
      if (e.code === 11000)
        throw new BadRequestException('the email is already registered');
    }
  }

  async loginByUserPass(dto: LoginUserDto) {
    let user = await this.userModel.findOne({ email: dto.email }, '+password');

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
