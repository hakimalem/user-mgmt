import {
  IsInt,
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  @IsOptional()
  posteId?: number;

  @IsInt()
  @IsOptional()
  agenceId?: number;

  @IsInt()
  @IsOptional()
  companyId?: number;
}
