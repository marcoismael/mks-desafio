import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../config/database.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserProvider } from './entities/user.provider';
import { UserService } from './user.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  const mockUsers: User[] = [
    new User({
      id: 1,
      name: 'user1',
      email: 'email@email.com',
      password: 'teste1',
      created_at: new Date(),
      updated_at: new Date(),
    }),
    new User({
      id: 2,
      name: 'user2',
      email: 'email2@email2.com',
      password: 'teste2',
      created_at: new Date(),
      updated_at: new Date(),
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [
        ...UserProvider,
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('create', () => {
    it('should create a new User', async () => {
      const createUserDto: CreateUserDto = {
        name: 'user',
        password: 'teste1',
        email: 'email@test.com',
      };
      userRepository.save = jest.fn().mockResolvedValue(mockUsers[0]);
      expect(await userService.create(createUserDto)).toBe(true);
    });
  });

  describe('findAll', () => {
    it('should get all users', async () => {
      userRepository.find = jest.fn().mockResolvedValue(mockUsers);
      expect(await userService.findAll()).toBe(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should get user with id 1', async () => {
      userRepository.findOne = jest.fn().mockResolvedValue(mockUsers[0]);
      expect(await userService.findOne(1)).toBe(mockUsers[0]);
    });
  });

  describe('update', () => {
    it('should udate a User', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'user',
      };
      userRepository.save = jest.fn().mockResolvedValue(mockUsers[0]);
      expect(await userService.update(1, updateUserDto)).toBe(true);
    });
  });

  describe('remove', () => {
    it('should remove a User', async () => {
      userRepository.remove = jest.fn().mockResolvedValue(mockUsers[0]);
      expect(await userService.remove(1)).toBe(true);
    });
  });
});
