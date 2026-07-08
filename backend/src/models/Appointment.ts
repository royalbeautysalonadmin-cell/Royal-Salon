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

// Atomic double-booking guard: only one non-rejected appointment can hold a
// given date+time. Partial so a rejected booking doesn't permanently lock
// the slot — the app-level availability check already filters these out,
// this index is the last-resort safety net against a race between two
// customers submitting the same slot at once.
AppointmentSchema.index(
  { date: 1, time: 1 },
  { unique: true, partialFilterExpression: { status: { $in: ["pending", "approved", "completed"] } } }
);

export type AppointmentDoc = InferSchemaType<typeof AppointmentSchema>;

export const Appointment =
  models.Appointment || model("Appointment", AppointmentSchema);
