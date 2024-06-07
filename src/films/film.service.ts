import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto'

@Injectable()
export class FilmService {
  constructor(
    @Inject('FILM_REPOSITORY')
    private filmRepository?: Repository<Film>,
  ) {}

  async create(createUserDto: CreateFilmDto): Promise<boolean> {
    await this.filmRepository.save(createUserDto);
    return true;
  }

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findOne(id: number): Promise<Film> {
    const film = await this.filmRepository.findOneBy({ id: id });
    if (film) return film;
    throw new NotFoundException('Film not found');
  }

  async findById(ids: number[]): Promise<Film[]> {
    const films = await this.filmRepository.findBy({ id: In(ids) });
    return films;
  }

  async update(id: number, updateFilmDto: UpdateFilmDto): Promise<boolean> {
    const film = await this.findOne(id);
    if (film) {
      this.filmRepository.save({ ...film, ...updateFilmDto });
      return true;
    } else {
      throw new NotFoundException('Film not found');
    }
  }

  async remove(id: number): Promise<boolean> {
    const film = await this.findOne(id);
    if (film) {
      this.filmRepository.remove(film);
      return true;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
