import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import IUsersService from './interfaces/IUsersService';

import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new this.userModel(createUserDto);
      return await user.save();
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('Lol no user');
    }

    user.email = updateUserDto.email ?? user.email;
    user.username = updateUserDto.username ?? user.username;

    return await user.save();
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('Lol no user');
    }

    await user.remove();

    return id;
  }
}
