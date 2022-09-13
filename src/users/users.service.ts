import { User } from './entities/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private users: Array<User> = [];

  create(createUserDto: CreateUserDto) {
    const user = new User(
      uuid(),
      createUserDto.username,
      createUserDto.password,
    );
    this.users.push(user);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((u) => u.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) {
      throw new NotFoundException('Lol no user');
    }

    user.password = updateUserDto.password ?? user.password;
    user.username = updateUserDto.username ?? user.username;

    return user;
  }

  remove(id: string) {
    return this.users.splice(
      this.users.findIndex((u) => u.id === id),
      1,
    );
  }
}
