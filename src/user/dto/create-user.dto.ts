import { IsNotEmpty, IsStrongPassword, Length, IsEmail, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'Name of the user',
        example: 'Marco Ismael',
    })
    @IsNotEmpty({ message: 'Name is required' })
    @Length(3, 100, {
        message: 'The name field must contain 5 to 100 characters',
    })
    name: string;

    @ApiProperty({
        description: 'Password of the user',
        example: 'Password123!',
    })
    @IsNotEmpty()
    @MaxLength(132, {
        message: 'Password is too long',
    })
    password: string;

    @ApiProperty({
        description: 'Email of the user',
        example: 'user@example.com',
    })
    @IsNotEmpty({ message: 'Email is required' })
    @Length(3, 127)
    @IsEmail()
    email: string;
}