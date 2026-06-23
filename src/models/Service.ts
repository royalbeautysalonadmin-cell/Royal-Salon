import { Schema, model, models, type InferSchemaType } from "mongoose";

const ServiceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    duration: { type: String, default: "" },
    image: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export type ServiceDoc = InferSchemaType<typeof ServiceSchema>;
export const ServiceModel = models.Service || model("Service", ServiceSchema);
