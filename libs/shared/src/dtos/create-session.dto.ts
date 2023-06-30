import { IsIn, IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
export enum PlatformType {
  ANDROID = 'android',
  IOS = 'ios',
  WEB = 'web',
}

export class CreateSessionDto {
  @IsIn(['fa', 'ar', 'en'])
  language: string;

  @IsIn([PlatformType.ANDROID, PlatformType.IOS, PlatformType.WEB])
  platform: PlatformType;

  @IsNotEmpty()
  os: string;

  @IsPositive()
  @Type(() => Number)
  build: number;
}
