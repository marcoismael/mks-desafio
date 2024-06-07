import { DataSource } from 'typeorm';
import { Film } from './film.entity';

export const FilmProvider = [
  {
    provide: 'FILM_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Film),
    inject: ['DATA_SOURCE'],
  },
];
