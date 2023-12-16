export interface AuthToken {
  roles: string[];
  sub: string;
  iat: number;
  exp: number;
}
