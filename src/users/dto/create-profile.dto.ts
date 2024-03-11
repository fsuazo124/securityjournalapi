import { IsBoolean, IsNotEmpty, IsObject, IsString, Length } from 'class-validator';

class PermissionsDTO {
  @IsBoolean()
  create?: boolean;

  @IsBoolean()
  read?: boolean;

  @IsBoolean()
  update?: boolean;

  @IsBoolean()
  delete?: boolean;
}

export class CreateProfileDTO {
  @IsString()
  @IsNotEmpty()
  @Length(3, 15)
  title: string;

  @IsString()
  description?: string;

  @IsObject()
  @IsNotEmpty()
  permissions: PermissionsDTO;
}

