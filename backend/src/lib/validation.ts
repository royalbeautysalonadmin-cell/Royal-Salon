import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  serviceName: z.string().optional(),
  date: z.string().min(1, "Please choose a date"),
  time: z.string().min(1, "Please choose a time"),
  notes: z.string().max(1000).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(5, "Please enter a message"),
});

export const SERVICE_CATEGORIES = [
  "Hair",
  "Makeup & Styling",
  "Threading",
  "Waxing",
  "Facial & Skin Care",
  "Manicure & Pedicure",
] as const;

export const serviceSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(SERVICE_CATEGORIES),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  duration: z.string().optional(),
  image: z.string().optional(),
  featured: z.boolean().optional(),
  active: z.boolean().optional(),
  originalPrice: z.number().nonnegative().optional(),
  priceOnRequest: z.boolean().optional(),
  variant: z.string().optional(),
});

/** Fields an admin may change on an existing service via PATCH. */
export const serviceUpdateSchema = serviceSchema.partial();
