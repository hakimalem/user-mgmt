import {
  IsInt,
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';

export class UpdateExtraUserRoleDTO {
  @IsInt()
  @IsOptional()
  userId?: number;

  @IsInt()
  @IsOptional()
  roleId?: number;
}
