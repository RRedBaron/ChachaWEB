import { z } from 'zod';
import { RoleEnum } from '../shared/enums';

export const createUserParamsSchema = z
    .object({
        username: z.string(),
        password: z.string(),
        email: z.string().email(),
        isVerified: z.boolean(),
        role: z.enum([RoleEnum.USER, RoleEnum.ADMIN])
    })
    .strict();

export type CreateUserParams = z.infer<typeof createUserParamsSchema>;

export const getUserParamsSchema = z
    .object({
        email: z.string().email().optional(),
        username: z.string().min(1).optional()
    })
    .strict();

export type GetUserParams = z.infer<typeof getUserParamsSchema>;
