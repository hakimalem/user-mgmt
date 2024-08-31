import {
  IsInt,
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';

export class UpdatePosteRolesDTO {
  @IsInt()
  @IsOptional()
  roleId?: number;

  @IsInt()
  @IsOptional()
  posteId?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
