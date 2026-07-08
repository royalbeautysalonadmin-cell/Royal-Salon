import { Schema, model, models, type InferSchemaType } from "mongoose";

/**
 * A single time slot an admin has manually closed for booking (e.g. a
 * lunch break, staff day off, or fully-booked walk-in slot). Slots taken
 * by real customer appointments are derived from the Appointment
 * collection instead — this only covers admin-initiated closures.
 */
const BlockedSlotSchema = new Schema(
  {
    date: { type: String, required: true, index: true }, // YYYY-MM-DD
    time: { type: String, required: true }, // e.g. "10:00 AM"
    reason: { type: String, default: "" },
  },
  { timestamps: true }
);

BlockedSlotSchema.index({ date: 1, time: 1 }, { unique: true });

export type BlockedSlotDoc = InferSchemaType<typeof BlockedSlotSchema>;
export const BlockedSlot = models.BlockedSlot || model("BlockedSlot", BlockedSlotSchema);
