import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly secret: string;

  constructor() {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    this.secret = process.env.JWT_SECRET;
  }

  sign(payload: object, expiresIn: string | number): string {
    return jwt.sign(payload, this.secret, { expiresIn: expiresIn as any });
  }

  verify(token: string): object {
    try {
      return jwt.verify(token, this.secret) as object;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
