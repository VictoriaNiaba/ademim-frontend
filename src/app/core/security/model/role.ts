export interface Role {
  name: RoleName;
}

export enum RoleName {
  ADMINISTRATOR = 'ADMINISTRATOR',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
}
