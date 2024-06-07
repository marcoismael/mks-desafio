import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDto {
  @ApiProperty({
    description: 'Title of film'
  })
  title: string;

  @ApiProperty({
    description: 'Director of film'
  })
  director: string;
}