import { SetMetadata } from '@nestjs/common';
import { METHOD_ROLES_METADATA } from '../constants';

export function Roles(...roles: string[]): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        SetMetadata(METHOD_ROLES_METADATA, roles)(target, propertyKey, descriptor);
    };
}
