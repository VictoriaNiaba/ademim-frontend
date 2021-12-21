import { Role } from './role';

export interface UserAccount {
  id: number;
  firstname: string;
  lastname: string;
  emailAddress: string;
  roles: Role[];
}
