import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateSessionDto } from '@app/shared/dtos/create-session.dto';

export class CreateUserDto extends CreateSessionDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsNotEmpty()
  @MinLength(8, { message: 'Insert at latest 8 characters' })
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}
