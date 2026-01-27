export type UserRoleType = "ADMIN" | "TEACHER";

export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  role: UserRoleType;
};
