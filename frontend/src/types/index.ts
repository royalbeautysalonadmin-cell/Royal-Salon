export type ServiceCategory =
  | "Hair"
  | "Makeup & Styling"
  | "Threading"
  | "Waxing"
  | "Facial & Skin Care"
  | "Manicure & Pedicure";

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  duration: string;
  image: string;
  featured?: boolean;
  variant?: string;
  originalPrice?: number;
  priceOnRequest?: boolean;
  active?: boolean;
}

export interface Package {
  slug: string;
  name: string;
  type: "Bridal" | "Monthly" | "Seasonal";
  price: number;
  originalPrice?: number;
  description: string;
  includes: string[];
  benefits: string[];
  image: string;
  popular?: boolean;
}

export interface Course {
  slug: string;
  name: string;
  duration: string;
  level: "Beginner" | "Professional" | "Master";
  price: number;
  description: string;
  modules: string[];
  certification: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface GalleryImage {
  src: string;
  category: "Bridal" | "Hair" | "Makeup" | "Nails" | "Skin" | "Mehndi";
  alt: string;
}

export type AppointmentStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "completed";

export interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}
