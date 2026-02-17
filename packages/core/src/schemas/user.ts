/**
 * Zod schemas for user types.
 */
import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const userProfileSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  display_name: z.string().nullable(),
  avatar_url: z.string().url().nullable(),
  bio: z.string().max(500).nullable(),
});

export type UserSchema = z.infer<typeof userSchema>;
export type UserProfileSchema = z.infer<typeof userProfileSchema>;
