import { validateToken } from '../utils/auth-token-validation';
import { Request } from 'express';

export function expressAuthentication(
    request: Request,
    securityName: string,
    scopes?: string[]
): Promise<any> {
    const authorization = request?.headers?.authorization?.split(' ');
    const token = authorization?.[1];
    return validateToken(token);
}
