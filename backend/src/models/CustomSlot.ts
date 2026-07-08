import { Schema, model, models, type InferSchemaType } from "mongoose";

/** An admin-added, one-off bookable time on top of the standard TIME_SLOTS
 *  catalog (see lib/availability.ts) — e.g. an extra early or late slot on
 *  a specific date. */
const CustomSlotSchema = new Schema(
  {
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

CustomSlotSchema.index({ date: 1, time: 1 }, { unique: true });

export type CustomSlotDoc = InferSchemaType<typeof CustomSlotSchema>;
export const CustomSlot = models.CustomSlot || model("CustomSlot", CustomSlotSchema);
