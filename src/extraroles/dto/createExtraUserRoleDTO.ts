import { IsArray, IsInt } from 'class-validator';
export class CreateExtraUserRoleDTO {
  @IsArray()
  roleId: number[];

  @IsInt()
  userId: number;
}
