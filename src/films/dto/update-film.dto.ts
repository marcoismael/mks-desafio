import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmDto } from './create-film.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @ApiPropertyOptional({
    description: 'Name of film'
  })
  title?: string;

  @ApiPropertyOptional({
    description: 'Name of director',
  })
  director?: string;
}