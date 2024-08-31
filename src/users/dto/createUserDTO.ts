import {
  IsInt,
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';
export class CreateUserDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsInt()
  posteId: number;

  @IsInt()
  agenceId: number;

  @IsInt()
  companyId: number;

  @IsInt()
  employeeId: number;
}
