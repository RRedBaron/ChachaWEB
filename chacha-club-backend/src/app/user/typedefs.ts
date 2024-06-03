import { RoleEnum } from '../shared/enums';

export { CreateUserParams, GetUserParams } from './schemes';

export type User = {
    id: number;
    username: string;
    email: string;
    role: RoleEnum;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type UserWithPassword = User & {
    password: string;
};

