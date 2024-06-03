import { z } from 'zod';

export const createIngredientParamsSchema = z
    .object({
        name: z.string().min(1)
    })
    .strict();

export type CreateIngredientParams = z.infer<typeof createIngredientParamsSchema>;

export const updateIngredientParamsSchema = z
    .object({
        name: z.string().min(1).optional()
    })
    .strict();

export type UpdateIngredientParams = z.infer<typeof updateIngredientParamsSchema>;
