import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../config/database.module';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { Film } from './entities/film.entity';
import { FilmProvider } from './entities/film.provider';
import { FilmService } from './film.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let filmService: FilmService;
  let filmRepository: Repository<Film>;

  const mockUsers: Film[] = [
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
      providers: [
        ...FilmProvider,
        FilmService,
        {
          provide: getRepositoryToken(Film),
          useClass: Repository,
        },
      ],
    }).compile();

    filmService = module.get<FilmService>(FilmService);
    filmRepository = module.get<Repository<Film>>(getRepositoryToken(Film));
  });

  describe('create', () => {
    it('should create a new User', async () => {
      const createUserDto: CreateFilmDto = {
        title: 'Quentin Tarantino',
        director: 'Django'
      };
      filmRepository.save = jest.fn().mockResolvedValue(mockUsers[0]);
      expect(await filmService.create(createUserDto)).toBe(true);
    });
  });

  describe('findAll', () => {
    it('should get all users', async () => {
      filmRepository.find = jest.fn().mockResolvedValue(mockUsers);
      expect(await filmService.findAll()).toBe(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should get user with id 1', async () => {
      filmRepository.findOne = jest.fn().mockResolvedValue(mockUsers[0]);
      expect(await filmService.findOne(1)).toBe(mockUsers[0]);
    });
  });

  describe('update', () => {
    it('should udate a User', async () => {
      const updateUserDto: UpdateFilmDto = {
        title: 'Spok',
      };
      filmRepository.save = jest.fn().mockResolvedValue(mockUsers[0]);
      expect(await filmService.update(1, updateUserDto)).toBe(true);
    });
  });

  describe('remove', () => {
    it('should remove a User', async () => {
      filmRepository.remove = jest.fn().mockResolvedValue(mockUsers[0]);
      expect(await filmService.remove(1)).toBe(true);
    });
  });
});
