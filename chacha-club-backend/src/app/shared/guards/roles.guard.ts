import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { METHOD_ROLES_METADATA } from '../constants';

@Injectable()
export class RolesGuard implements CanActivate {
    private readonly logger = new Logger(RolesGuard.name);
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[] | undefined>(
            METHOD_ROLES_METADATA,
            context.getHandler()
        );

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();

        return requiredRoles.some((role) => user?.role === role);
    }
}
