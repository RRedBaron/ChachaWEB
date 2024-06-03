import { z } from 'zod';

export const registerParamsSchema = z
    .object({
        username: z.string().min(1),
        password: z.string().min(8),
        email: z.string().email().min(1),
        captchaToken: z.string().min(1)
    })
    .strict();

export type RegisterParams = z.infer<typeof registerParamsSchema>;
