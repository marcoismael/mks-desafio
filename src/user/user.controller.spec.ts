import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../config/database.module';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserProvider } from './entities/user.provider';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  const mockUsers = [
    new User({
      id: 1,
      name: 'user1',
      password: 'teste1',
      email: 'email@email.com',
      created_at: new Date(),
      updated_at: new Date(),
    }),
    new User({
      id: 2,
      name: 'user2',
      password: 'teste2',
      email: 'email2@email2.com',
      created_at: new Date(),
      updated_at: new Date(),
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [UserController],
      providers: [...UserProvider, UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('should create a new User', async () => {
      const createUserDto: CreateUserDto = {
        name: 'user',
        password:'teste1',
        email: 'email@test.com',
      };

      jest.spyOn(userService, 'create').mockImplementation(async () => true);
      expect(await userController.create(createUserDto)).toBe(true);
    });
  });

  describe('findAll', () => {
    it('should get all users', async () => {
      jest
        .spyOn(userService, 'findAll')
        .mockImplementation(async () => mockUsers);
      expect(await userController.findAll()).toBe(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should get user with id 1', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockImplementation(async () => mockUsers[0]);
      expect(await userController.findOne('1')).toBe(mockUsers[0]);
    });
  });

  describe('update', () => {
    it('should udate a User', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'user',
      };

      jest.spyOn(userService, 'update').mockImplementation(async () => true);
      expect(await userController.update('1', updateUserDto)).toBe(true);
    });
  });

  describe('remove', () => {
    it('should remove a User', async () => {
      jest.spyOn(userService, 'remove').mockImplementation(async () => true);
      expect(await userController.remove('1')).toBe(true);
    });
  });
});
