import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRoles } from '@app/shared';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;
  @IsEnum(UserRoles, { each: true })
  @IsOptional()
  roles: string[];
  @IsNotEmpty()
  @IsNotEmpty()
  @MinLength(8, { message: 'Insert at latest 8 characters' })
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'weak password',
  })
  @IsOptional()
  password: string;
  @IsNotEmpty()
  @IsOptional()
  confirmPassword: string;
}
