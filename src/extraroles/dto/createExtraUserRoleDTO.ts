import { IsInt } from 'class-validator';
export class CreateExtraUserRoleDTO {
  @IsInt()
  userId: number;

  @IsInt()
  roleId: number;
}
