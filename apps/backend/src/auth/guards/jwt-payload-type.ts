export interface BaseJwtPayload {
  tokenType: string;
  iat?: number;
  exp?: number;
}

export interface UserJwtPayload extends BaseJwtPayload {
  tokenType: 'user-authorization';
  userId: number;
  nickname: string;
}

export interface AdminJwtPayload extends BaseJwtPayload {
  tokenType: 'admin-authorization';
  sub: number;
  role: 'admin';
}

export interface MobileJwtPayload extends BaseJwtPayload {
  tokenType: 'mobile-authorization';
  storeId: number;
  tableNumber: number;
}

export type JwtPayload = UserJwtPayload | AdminJwtPayload | MobileJwtPayload;
