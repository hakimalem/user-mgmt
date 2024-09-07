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
  @IsArray()
  roleId: number[];

  @IsInt()
  posteId: number;
}
