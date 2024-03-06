import { IsString, IsNotEmpty, IsInt, Matches, Min, Length } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty()
  @Length(4, 15)
  user_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'The password must contain at least one capital letter, one number, and one special character',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  last_name?: string;

  @IsInt()
  @IsNotEmpty()
  id_profile: number;

}