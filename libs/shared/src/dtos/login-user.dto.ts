import { CreateSessionDto } from '@app/shared/dtos/create-session.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto extends CreateSessionDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
