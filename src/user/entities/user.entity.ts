import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Film } from 'src/films/entities/film.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        description: 'Id of User',
        example: '1',
    })
    id: number

    @Column({ nullable: false })
    @ApiProperty({
        description: 'Name of the user',
        example: 'Marco Ismael',
    })
    name: string

    @Column({ nullable: false })
    @ApiProperty({
        description: 'Password of the user',
        example: 'Password123!',
    })
    password: string;

    @Column({ nullable: false, unique: true })
    @ApiProperty({
        description: 'Email of the user',
        example: 'user@example.com',
    })
    email: string;

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

    constructor(user?: Partial<User>) {
        this.id = user?.id;
        this.name = user?.name;
        this.email = user?.email;
        this.created_at = user?.created_at;
        this.updated_at = user?.updated_at;
      }
    }



