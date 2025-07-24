import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from '../jwt.service';

export function JwtAuthGuard(
  extraHeaderKeys: string[] = [], // pin-authorization, mobile-authorization 등만 넘기면 됨
): new (...args: any[]) => CanActivate {
  const allowedHeaderKeys = ['authorization', ...extraHeaderKeys];
  @Injectable()
  class DynamicJwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();

      for (const headerKey of allowedHeaderKeys) {
        const authHeader = request.headers[headerKey]?.toString();
        if (authHeader?.startsWith('Bearer ')) {
          const token = authHeader.split(' ')[1];

          try {
            const payload = this.jwtService.verify(token);
            (request as any).user = payload;
            return true;
          } catch {
            // continue checking other headers
          }
        }
      }

      throw new UnauthorizedException('No valid JWT in any accepted header');
    }
  }

  return DynamicJwtAuthGuard;
}
