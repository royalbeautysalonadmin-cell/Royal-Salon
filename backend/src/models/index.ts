import { Schema, model, models } from "mongoose";

/** Gallery image */
const GallerySchema = new Schema(
  {
    src: { type: String, required: true },
    publicId: { type: String },
    category: { type: String, required: true },
    alt: { type: String, default: "" },
  },
  { timestamps: true }
);
export const Gallery = models.Gallery || model("Gallery", GallerySchema);

/** Testimonial / review */
const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, default: "Client" },
    avatar: { type: String, default: "" },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    quote: { type: String, required: true },
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);
export const Testimonial =
  models.Testimonial || model("Testimonial", TestimonialSchema);

/** Beauty package */
const PackageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String, default: "" },
    includes: { type: [String], default: [] },
    benefits: { type: [String], default: [] },
    image: { type: String, default: "" },
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const PackageModel = models.Package || model("Package", PackageSchema);

/** Training course */
const CourseSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    duration: { type: String, default: "" },
    level: { type: String, default: "Professional" },
    price: { type: Number, required: true },
    description: { type: String, default: "" },
    modules: { type: [String], default: [] },
    certification: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);
export const TrainingCourse =
  models.TrainingCourse || model("TrainingCourse", CourseSchema);

/** Contact / inquiry message */
const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);
export const ContactMessage =
  models.ContactMessage || model("ContactMessage", ContactMessageSchema);

/** Site settings (singleton-ish) */
const SettingsSchema = new Schema(
  {
    key: { type: String, default: "global", unique: true },
    salonName: { type: String, default: "Royal Beauty Salon" },
    phone: String,
    email: String,
    address: String,
    announcement: String,
  },
  { timestamps: true }
);
export const Settings = models.Settings || model("Settings", SettingsSchema);
