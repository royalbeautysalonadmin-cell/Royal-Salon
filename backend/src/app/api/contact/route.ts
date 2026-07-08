import { NextResponse } from "next/server";
import { connectDB, isDbConfigured } from "@/lib/db";
import { ContactMessage } from "@/models/index";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed" }, { status: 400 });
    }
    if (isDbConfigured) {
      await connectDB();
      await ContactMessage.create(parsed.data);
    }
    try {
      await sendContactEmail(parsed.data);
    } catch (e) {
      console.error("[contact] email error", e);
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e) {
    console.error("[contact] error", e);
    return NextResponse.json({ error: "Unable to send message" }, { status: 500 });
  }
}
