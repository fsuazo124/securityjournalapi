import { IsBoolean, IsNotEmpty, IsObject, IsString } from 'class-validator';

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
  title: string;

  @IsString()
  description?: string;

  @IsObject()
  @IsNotEmpty()
  permissions: PermissionsDTO;
}

