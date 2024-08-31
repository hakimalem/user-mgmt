import {
  IsInt,
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';
export class CreatePosteRolesDTO {
  @IsInt()
  roleId: number;

  @IsInt()
  posteId: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
