import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  GetSession,
  Roles,
  Session,
  SharedService,
  UserRoles,
} from '@app/shared';
import { UserService } from './user.service';
import { RolesGuard } from '@app/shared/gurds/roles.gurd';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
@UseGuards(AuthGuard(), RolesGuard)
export class UserController {
  constructor(private service: UserService) {}
  @Get()
  @Roles(UserRoles.ADMIN, UserRoles.VIEWER)
  async getUserList(@GetSession() session: Session) {
    return SharedService.ResponseResult(await this.service.getUserList({}));
  }

  @Get('/profile')
  async getProfile(@GetSession() session: Session) {
    return SharedService.ResponseResult(session.user);
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN)
  async updateUser(@Param('id') userId: string, @Body() dto: UpdateUserDto) {
    return SharedService.ResponseResult(
      await this.service.updateUser(userId, dto),
    );
  }
}
