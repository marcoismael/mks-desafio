import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@Entity('films')
export class Film {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: 'Id of film',
    example: '1'
})
  id: number;

  @Column()
  @ApiProperty({
    description: 'Title of film',
    example: 'Django',
})
  title: string;

  @Column()
  @ApiProperty({
    description: 'Director of film',
    example: 'Quentin Tarantino',
})
  director: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;

  constructor(film?: Partial<Film>) {
    this.id = film?.id;
    this.title = film?.title;
    this.director = film?.director;
    this.created_at = film?.created_at;
    this.updated_at = film?.updated_at
  }
}