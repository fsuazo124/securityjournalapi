import { IsNotEmpty, IsString, Length, Matches } from "class-validator";


export class CreateAuthDto {

    @IsNotEmpty({message: 'El nombre de usuario no puede estar vacío'})
    user_name: string;
  
    @IsNotEmpty({message: 'La contraseña no puede estar vacía'})
    password: string;
}
