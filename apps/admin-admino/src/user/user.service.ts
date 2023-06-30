import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserProp } from '@app/shared';
import { FilterQuery, Model } from 'mongoose';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  findUser = async (
    search: FilterQuery<User>,
    project: string | string[] = UserProp.general,
  ) => await this.userModel.findOne(search, project);

  getUserList = async (
    search: FilterQuery<User>,
    project: string | string[] = UserProp.general,
  ) => await this.userModel.find(search, project);

  updateUser = async (userID: string, dto: UpdateUserDto): Promise<User> => {
    if (dto.password && !dto.confirmPassword)
      throw new BadRequestException(
        'Pass password and confirm password together',
      );

    if (dto.password !== dto.confirmPassword)
      throw new BadRequestException(
        'confirmation password not same as inputted password',
      );

    const user = await this.userModel.findByIdAndUpdate(userID, dto, {
      new: true,
    });
    if (!user) throw new NotFoundException(`User not found by ${userID} id`);

    return user;
  };
}
