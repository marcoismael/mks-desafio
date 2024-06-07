import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class UserService {
  redis;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject('USER_REPOSITORY')
    private userRepository?: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<boolean> {
    
    const user = await this.userRepository.save(createUserDto);
    return true;
  }

  async findAll(): Promise<User[]> {
    const cachedUsers = await this.cacheManager.get<User[]>('users');
    if(!cachedUsers){
      const users = await this.userRepository.find()
      await this.cacheManager.set('users', JSON.stringify(users))
      console.log('\x1b[33m%s\x1b[0m', 'From Database')
      return users
    }
    console.log('\x1b[36m%s\x1b[0m', 'From Cache')
    return cachedUsers
    
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (user) return user;
    throw new NotFoundException('User not found');
  }

  async findById(ids: number[]): Promise<User[]> {
    const users = await this.userRepository.findBy({ id: In(ids) });
    return users;
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email: email });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const user = await this.findOne(id);
    if (user) {
      this.userRepository.save({ ...user, ...updateUserDto });
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async remove(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    if (user) {
      this.userRepository.remove(user);
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
