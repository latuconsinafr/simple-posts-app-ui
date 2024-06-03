export type UserRole = "admin" | "user";

export interface User {
  id: number;
  name: string;
  email: string;
  roles: UserRole[];
  created_at: Date;
  updated_at: Date;
}

export default User;
