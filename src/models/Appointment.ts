import { Schema, model, models, type InferSchemaType } from "mongoose";

const AppointmentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    service: { type: String, required: true },
    serviceName: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

export type AppointmentDoc = InferSchemaType<typeof AppointmentSchema>;

export const Appointment =
  models.Appointment || model("Appointment", AppointmentSchema);
