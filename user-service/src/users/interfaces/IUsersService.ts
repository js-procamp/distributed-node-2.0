import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';

export default interface IUsersService {
  create(createUserDto: CreateUserDto): Promise<User>;

  findAll(): Promise<Array<User>>;

  findOne(id: string): Promise<User>;

  update(id: string, updateUserDto: UpdateUserDto): Promise<User>;

  remove(id: string): Promise<string>;
}
