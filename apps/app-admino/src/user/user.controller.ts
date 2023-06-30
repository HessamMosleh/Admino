import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from '@app/shared/dtos/login-user.dto';
import { GetSession, Session, SharedService } from '@app/shared';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/sign-up')
  signUpUser(@Body() dto: CreateUserDto) {
    return this.service.createUser(dto);
  }

  @Post('/sign-in')
  signInUser(@Body() dto: LoginUserDto) {
    return this.service.loginByUserPass(dto);
  }

  @Get('/profile')
  @UseGuards(AuthGuard())
  getProfile(@GetSession() session: Session) {
    return SharedService.ResponseResult(session.user);
  }
}
