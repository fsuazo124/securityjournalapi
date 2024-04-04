import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';

export class UpdateUsersDto extends PartialType(CreateUserDto) {

  @IsOptional()
  first_name?: string;

  @IsOptional()
  last_name?: string;

  @IsOptional()
  user_name?: string;

  @IsOptional()
  id_profile?: number;

  @IsOptional()
  password?: string;

}