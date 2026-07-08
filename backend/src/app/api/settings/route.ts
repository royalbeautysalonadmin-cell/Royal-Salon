import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB, isDbConfigured } from "@/lib/db";
import { Settings } from "@/models/index";
import { triggerRevalidate } from "@/lib/revalidate";

export const dynamic = "force-dynamic";

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;

// Public: the booking dialog and the homepage announcement banner both
// need this without being logged in.
export async function GET() {
  if (!isDbConfigured) return NextResponse.json({ closedDays: [] });
  await connectDB();
  const settings = await Settings.findOne({ key: "global" }).select("closedDays announcement").lean<{
    closedDays?: string[];
    announcement?: string;
  }>();
  return NextResponse.json({
    closedDays: settings?.closedDays || [],
    announcement: settings?.announcement || "",
  });
}

/** Admin: update which weekdays the salon is closed on. */
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!isDbConfigured) return NextResponse.json({ error: "Database not configured" }, { status: 503 });

  const body = await req.json();
  const closedDays = body.closedDays;
  if (
    !Array.isArray(closedDays) ||
    !closedDays.every((d) => typeof d === "string" && (WEEKDAYS as readonly string[]).includes(d))
  ) {
    return NextResponse.json(
      { error: `closedDays must be an array of: ${WEEKDAYS.join(", ")}` },
      { status: 400 }
    );
  }

  await connectDB();
  const updated = await Settings.findOneAndUpdate(
    { key: "global" },
    { closedDays },
    { upsert: true, new: true }
  ).lean<{ closedDays?: string[] }>();
  triggerRevalidate();
  return NextResponse.json({ closedDays: updated?.closedDays || [] });
}
