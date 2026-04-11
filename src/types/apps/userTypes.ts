export type UserRole = "user" | "res_partner" | "driver" | "admin";

export type TUsersType = {
  _id: string;
  role: UserRole;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  userName: string;
  profileImage: string;
  isEmailVerified: boolean;
  status: string;
  createdAt: string;
};
