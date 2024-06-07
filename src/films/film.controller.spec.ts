import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../config/database.module';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { FilmProvider } from './entities/film.provider';
import { FilmController } from './film.controller';
import { FilmService } from './film.service';

describe('FilmController', () => {
  let filmController: FilmController;
  let filmService: FilmService;

  const mockUsers = [
    new Film({
      id: 1,
      title: 'Flme Teste',
      director: 'Teste',
      created_at: new Date(),
      updated_at: new Date(),
    }),
    new Film({
      id: 2,
      title: 'Flme Teste2',
      director: 'Teste',
      created_at: new Date(),
      updated_at: new Date(),
    }),
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [FilmController],
      providers: [...FilmProvider, FilmService],
    }).compile();

    filmController = module.get<FilmController>(FilmController);
    filmService = module.get<FilmService>(FilmService);
  });

  describe('create', () => {
    it('should create a new User', async () => {
      const createUserDto: CreateFilmDto = {
        title: 'Teste1',
        director: 'Quentin'
      };

      jest.spyOn(filmService, 'create').mockImplementation(async () => true);
      expect(await filmController.create(createUserDto)).toBe(true);
    });
  });

  describe('findAll', () => {
    it('should get all users', async () => {
      jest
        .spyOn(filmService, 'findAll')
        .mockImplementation(async () => mockUsers);
      expect(await filmController.findAll()).toBe(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should get user with id 1', async () => {
      jest
        .spyOn(filmService, 'findOne')
        .mockImplementation(async () => mockUsers[0]);
      expect(await filmController.findOne('1')).toBe(mockUsers[0]);
    });
  });

  describe('update', () => {
    it('should udate a User', async () => {
      const updateUserDto: UpdateFilmDto = {
        title: 'Django',
      };

      jest.spyOn(filmService, 'update').mockImplementation(async () => true);
      expect(await filmController.update('1', updateUserDto)).toBe(true);
    });
  });

  describe('remove', () => {
    it('should remove a User', async () => {
      jest.spyOn(filmService, 'remove').mockImplementation(async () => true);
      expect(await filmController.remove('1')).toBe(true);
    });
  });
});
