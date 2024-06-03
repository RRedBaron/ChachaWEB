import { Enum } from './ts/utility-types';
import { ROLES } from './constants';

export const RoleEnum = ROLES;
export type RoleEnum = Enum<typeof RoleEnum>;
