import { RoleEnum } from '../enums';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

export function JwtAuth(...roles: RoleEnum[]) {
    return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard), Roles(...roles));
}
