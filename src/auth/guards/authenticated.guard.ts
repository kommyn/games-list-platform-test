import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import type { Request } from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest<Request>();
        return req.isAuthenticated();
    }
}
