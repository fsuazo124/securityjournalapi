import { IsString, IsNotEmpty, IsInt, Matches, Min, Length } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @IsNotEmpty({message: "El nombre de usuario no puede estar vacio"})
  @Length(4, 15)
  user_name: string;

  @IsString()
  @IsNotEmpty({message: "La contraseña no puede estar vacia"})
  @Length(8, 20,{message: "La contraseña debe contener al menos 8 caracteres"})
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, {
    message:
      'La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial',
  })
  password: string;

  @IsString()
  @IsNotEmpty({message: "El campo primer nombre no puede estar vacio"})
  first_name: string;

  @IsString()
  last_name?: string;

  @IsInt()
  @IsNotEmpty({message: "El campo de perfil no puede estar vacio"})
  id_profile: number;

}