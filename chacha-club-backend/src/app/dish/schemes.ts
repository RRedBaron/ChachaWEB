import { z } from 'zod';

export const createDishParamsSchema = z
    .object({
        name: z.string().min(1),
        description: z.string().min(1).optional(),
        image: z.string().min(1),
        price: z.number().positive(),
        weight: z.number().nonnegative().int(),
        time_to_cook: z.number().nonnegative().int(),
        category_id: z.number().positive().int(),
        ingredient_ids: z.array(z.number().positive().int()).optional()
    })
    .strict();

export type CreateDishParams = z.infer<typeof createDishParamsSchema>;

export const updateDishParamsSchema = z
    .object({
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        image: z.string().min(1).optional(),
        price: z.number().positive().optional(),
        weight: z.number().nonnegative().int().optional(),
        time_to_cook: z.number().nonnegative().optional(),
        category_id: z.number().positive().int().optional(),
        ingredient_ids: z.array(z.number().positive().int()).optional()
    })
    .strict();

export type UpdateDishParams = z.infer<typeof updateDishParamsSchema>;

export const getDishParamsSchema = z
    .object({
        id: z.string().regex(/^\d+$/, 'ID must be an integer').transform(Number).optional(),
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        image: z.string().min(1).optional(),
        weight: z.string().transform(Number).optional(),
        time_to_cook: z.string().transform(Number).optional(),
        price: z.string().transform(Number).optional(),
        category_id: z.string().regex(/^\d+$/, 'ID must be an integer').transform(Number).optional(),
        limit: z.string().regex(/^\d+$/, 'Limit must be an integer').transform(Number).optional(),
        page: z.string().regex(/^\d+$/, 'Page must be an integer').transform(Number).optional()
    })
    .strict();
export type GetDishParams = z.infer<typeof getDishParamsSchema>;
