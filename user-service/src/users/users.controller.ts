import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  CACHE_MANAGER,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/common';
import { Cache, Store } from 'cache-manager';
import { Redis } from 'ioredis';
import { ClearCacheInterceptor } from '../cache/ClearCacheInterceptor';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import IUsersService from './interfaces/IUsersService';

interface RedisCache extends Store {
  getClient(): Redis;
}

@Controller('users')
export class UsersController {
  constructor(
    @Inject('IUsersService') private readonly usersService: IUsersService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {
    console.log((<RedisCache>cacheManager.store).getClient());
  }

  @Post()
  @UseInterceptors(ClearCacheInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(300)
  async findAll() {
    await new Promise((r) => setTimeout(r, 5000));
    // this.cacheManager
    // .set('fromNest', 'working with nest framework')
    // .then(() => {
    //   console.log('Value cached!');
    // })
    // .then(() => this.cacheManager.get('fromNest'))
    // .then((data) => console.log('Result:', data));
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
