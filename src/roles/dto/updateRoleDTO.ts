import {
  IsInt,
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';

export class UpdateRoleDTO {
  @IsString()
  @IsOptional()
  name?: string;
}
