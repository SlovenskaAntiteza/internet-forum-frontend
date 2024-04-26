export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  approved?: boolean;
  blocked?: boolean;
  permissions?: string[];
}
