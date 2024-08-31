import {
  IsInt,
  IsString,
  IsBoolean,
  IsEmail,
  IsOptional,
  IsDate,
  IsArray,
} from 'class-validator';
export class CreateRoleDTO {
  @IsString()
  name: string;
}
