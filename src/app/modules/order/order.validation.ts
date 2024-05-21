import { z } from 'zod';

export const createOrderSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().min(0),
  quantity: z.number().min(1),
});

// Define a type for the order input based on the schema
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
