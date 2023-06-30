import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginUserDto } from '@app/shared/dtos/login-user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private service: AuthenticationService) {}

  @Post('/sign-in')
  loginAdmin(@Body() dto: LoginUserDto) {
    return this.service.loginByUserPass(dto);
  }
}
