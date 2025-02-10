import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  acceptedTerms: z.boolean()
});

export type RegisterSchema = typeof registerSchema;