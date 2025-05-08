import {z} from 'zod'

//auth
export const registerValidations = z.object({
    username: z
        .string()
        .min(4, 'Username must be at least 4 characters')
        .max(15, 'Username must be at most 15 characters')
        .regex(/^[a-zA-Z0-9]+$/, 'Username must only contain alphanumeric characters')
        .nonempty('Username is empty'),
    email: z.string().email('Invalid email').nonempty('Email is empty'),
    password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Password must only contain alphanumeric characters')
    .nonempty('Password is empty'),
    confirmPassword: z.string().nonempty('Confirm Password is empty'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export const generateCodesvalidations = z.object({
    chesttype: z.string().nonempty('Select a chest type'),
    quantity: z.number().min(1, 'Enter a valid number'),
    expiration: z.string().nonempty('Expiration date is empty'),
    items: z
      .array(
        z.object({
          itemtype: z.string().nonempty('Type is required'),
          quantity: z.number().min(1, 'Quantity must be at least 1'),
        })
      )
      .min(1, 'Items is empty'),
});

export const createRobuxvalidations = z.object({
    code: z.string().nonempty('Code is empty.'),
    amount: z.number().min(1, 'Enter a valid number'),
   
});

export const createTicketvalidations = z.object({
  code: z.string().nonempty('Code is empty.'),
  type: z.string().nonempty( 'Select a ticket type'),
});


export type RegisterUser = z.infer<typeof registerValidations>
export type GenerateCodesvalidation = z.infer<typeof generateCodesvalidations>
export type CreateRobuxCode = z.infer<typeof createRobuxvalidations>
export type CreateTicketCode = z.infer<typeof createTicketvalidations>
