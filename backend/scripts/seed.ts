/**
 * Seed the database with demo content + an admin user.
 * Usage: npm run seed   (requires MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD in .env.local)
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { allServices, packages, courses, testimonials, gallery } from "./seed-data";
import { ServiceModel } from "../src/models/Service";
import {
  Gallery,
  Testimonial,
  PackageModel,
  TrainingCourse,
} from "../src/models/index";
import { User } from "../src/models/User";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI missing in .env.local");
  await mongoose.connect(uri);
  console.log("✔ Connected to MongoDB");

  await Promise.all([
    ServiceModel.deleteMany({}),
    PackageModel.deleteMany({}),
    TrainingCourse.deleteMany({}),
    Testimonial.deleteMany({}),
    Gallery.deleteMany({}),
  ]);

  await ServiceModel.insertMany(allServices);
  await PackageModel.insertMany(packages);
  await TrainingCourse.insertMany(courses);
  await Testimonial.insertMany(testimonials);
  await Gallery.insertMany(gallery);
  console.log(
    `✔ Seeded ${allServices.length} services, ${packages.length} packages, ${courses.length} courses, ${testimonials.length} testimonials, ${gallery.length} gallery images`
  );

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    const hashed = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { name: "Salon Admin", email: email.toLowerCase(), password: hashed, role: "admin" },
      { upsert: true, new: true }
    );
    console.log(`✔ Admin user ready: ${email}`);
  } else {
    console.warn("⚠ ADMIN_EMAIL / ADMIN_PASSWORD not set — skipped admin user.");
  }

  await mongoose.disconnect();
  console.log("✔ Done. Disconnected.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
