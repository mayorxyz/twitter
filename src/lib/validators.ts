import { z } from 'zod';

// Create request form validation
export const createRequestSchema = z.object({
  type: z.enum(['follow', 'like', 'comment'], {
    message: 'Please select an action type',
  }),
  targetUrl: z
    .string()
    .min(1, 'URL is required')
    .url('Please enter a valid X (Twitter) URL'),
  pointsOffered: z
    .number()
    .min(1, 'Points must be at least 1')
    .max(1000, 'Points cannot exceed 1000 per slot'),
  slotsTotal: z
    .number()
    .min(1, 'At least 1 slot required')
    .max(100, 'Maximum 100 slots allowed'),
  context: z.string().max(500, 'Context must be less than 500 characters').optional(),
  category: z.string().optional(),
});

export type CreateRequestInput = z.infer<typeof createRequestSchema>;

// Fulfill request validation (for proof upload)
export const fulfillRequestSchema = z.object({
  proof: z.instanceof(File).optional(),
});

export type FulfillRequestInput = z.infer<typeof fulfillRequestSchema>;
