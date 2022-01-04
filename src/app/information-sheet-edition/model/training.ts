import { Student } from 'src/app/user-management/model/student';

export interface Training {
  name: string;
  students: Student[];
}
