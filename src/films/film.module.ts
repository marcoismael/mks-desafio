import { Module } from '@nestjs/common';
import { FilmService } from './film.service';
import { DatabaseModule } from 'src/config/database.module';
import { FilmController } from './film.controller';
import { FilmProvider } from './entities/film.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FilmController],
  providers: [...FilmProvider, FilmService],

})
export class FilmModule {}
