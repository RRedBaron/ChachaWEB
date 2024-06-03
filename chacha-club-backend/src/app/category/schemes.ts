import { z } from 'zod';

export const createCategoryParamsSchema = z
    .object({
        name: z.string().min(1)
    })
    .strict();

export type CreateCategoryParams = z.infer<typeof createCategoryParamsSchema>;

export const updateCategoryParamsSchema = z
    .object({
        name: z.string().min(1).optional()
    })
    .strict();

export type UpdateCategoryParams = z.infer<typeof updateCategoryParamsSchema>;
