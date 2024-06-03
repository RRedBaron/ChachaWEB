import { z } from 'zod';

export const createReviewParamsSchema = z
    .object({
        dish_id: z.number().int().positive(),
        rating: z.number().int().min(1).max(5),
        comment: z.string().min(1).optional(),
        captchaToken: z.string().min(1)
    })
    .strict();

export type CreateReviewParams = z.infer<typeof createReviewParamsSchema>;

export const updateReviewParamsSchema = z
    .object({
        dish_id: z.number().int().positive().optional(),
        rating: z.number().int().min(1).max(5).optional(),
        comment: z.string().min(1).optional()
    })
    .strict();

export type UpdateReviewParams = z.infer<typeof updateReviewParamsSchema>;

export const getReviewParamsSchema = z
    .object({
        dish_id: z.string().regex(/^\d+$/, 'ID must be an integer').transform(Number),
        limit: z.string().regex(/^\d+$/, 'Limit must be an integer').transform(Number).optional(),
        page: z.string().regex(/^\d+$/, 'Page must be an integer').transform(Number).optional()
    })
    .strict();

export type GetReviewParams = z.infer<typeof getReviewParamsSchema>;
