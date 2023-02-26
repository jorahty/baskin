import { Request } from 'express';
import { AuthService } from './authService';

export function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[],
): Promise<any> {
  return new AuthService().check(request.headers.authorization, scopes);
}
