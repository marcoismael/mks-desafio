import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Password of the user',
    example: 'Password123!',
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'Email of the user',
    example: 'user@example.com',
  })
  email?: string;
}