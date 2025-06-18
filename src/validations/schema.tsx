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
    length: z.string().nonempty('Select character length'),

});

export const createRobuxvalidations = z.object({
    code: z.string().nonempty('Code is empty.'),
    name: z.string().nonempty('Name is empty.'),
    item: z.string().nonempty('Item is empty.'),
   
});

export const createTicketvalidations = z.object({
  // code: z.string().nonempty('Code is empty.'),
  // type: z.string().nonempty( 'Select a ticket type'),
  ticketid: z.string().nonempty('Ticket id is empty.'),
  item: z.string().nonempty('Item is empty.'),
  category: z.string().nonempty('Category is empty.'),
  tickettype: z.string().nonempty('Ticket type is empty.'),
  ticketname: z.string().nonempty('Ticket name is empty.'),
});

export const createItemvalidations = z.object({
    // itemname: z.string().nonempty('Item name is empty.'),
    // itemcode: z.string().nonempty('Item code is empty.'),
    // quantity: z.number().min(1,'Quantity is required.'),
    type: z.string().nonempty('Please select a type.'),
    itemname: z.string().nonempty('Item name is empty.'),
    rarity: z.string().nonempty('Rarity is empty.'),
    quantity: z.number().min(1,'Quantity is required.'),

});

export const createChestvalidations = z.object({
    chestid: z.string().nonempty('Chest id is empty.'),
    chestname: z.string().nonempty('Chest name is empty.'),
   
});

export const createCodesvalidations = z.object({
    // chest: z.string().nonempty('Chest is empty.'),
    expiration: z.string().nonempty('Expiration is empty.'),
    codeamount: z.number().min(1,'Code quantity should atleast 1.'),
    type: z.string().optional(), // <- now optional
    length: z.string().nonempty('Select character length'),
   
});


export const editCodesvalidations = z.object({
    // chesttype: z.string().nonempty('Select a chest type'),
    type: z.string().nonempty('Select a type'),
    expiration: z.string().nonempty('Expiration date is empty'),
    status: z.string().nonempty('Please select a status'),
    // length: z.string().nonempty('Select character length'),

    // items: z
    //   .array(
    //     z.object({
    //       itemtype: z.string().nonempty('Type is required'),
    //       quantity: z.number().min(1, 'Quantity must be at least 1'),
    //     })
    //   )
    //   .min(1, 'Items is empty'),
})


export type RegisterUser = z.infer<typeof registerValidations>
export type GenerateCodesvalidation = z.infer<typeof generateCodesvalidations>
export type CreateRobuxCode = z.infer<typeof createRobuxvalidations>
export type CreateTicketCode = z.infer<typeof createTicketvalidations>
export type CreateItems = z.infer<typeof createItemvalidations>
export type CreateChests = z.infer<typeof createChestvalidations>
export type GenerateCodes = z.infer<typeof createCodesvalidations>
export type EditCodes = z.infer<typeof editCodesvalidations>
