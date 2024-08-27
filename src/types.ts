export type UserWithRoles = {
  id: number;
  lastName: string;
  firstName: string;
  username: string;
  email: string;
  phone: string;
  employeeId: number;
  isActive: boolean;
  posteId: number;
  agenceId: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: number;
  companyId: number;
  allRoles: string[];
};
