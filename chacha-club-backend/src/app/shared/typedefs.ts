import { RoleEnum } from "./enums";

export type User = {
    id: number;
    username: string;
    email: string;
    isVerified: boolean;
    role: RoleEnum;
    createdAt: Date;
    updatedAt: Date;
};

