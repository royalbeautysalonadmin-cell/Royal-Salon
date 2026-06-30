import { Resend } from "resend";
import { siteConfig } from "./site";
import type { BookingPayload } from "@/types";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail =
  process.env.SMTP_FROM || "Royal Beauty Salon <onboarding@resend.dev>";
const adminEmail =
  process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || "warsawroyalbeauty@gmail.com";

export const isEmailConfigured = Boolean(resendApiKey);

function getClient() {
  return new Resend(resendApiKey);
}

const ROSE = "#6A4B3C";
const GOLD = "#D4AF37";

function shell(title: string, body: string) {
  return `
  <div style="background:#F6F1EA;padding:32px 0;font-family:Helvetica,Arial,sans-serif;color:#4A352A;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(74,53,42,.15);">
      <div style="background:linear-gradient(135deg,${ROSE},${GOLD});padding:32px;text-align:center;">
        <h1 style="margin:0;color:#fff;font-size:22px;letter-spacing:1px;">Royal Beauty Salon</h1>
        <p style="margin:6px 0 0;color:#fff;opacity:.9;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Where Beauty Meets Royalty</p>
      </div>
      <div style="padding:32px;">
        <h2 style="color:${ROSE};font-size:20px;margin-top:0;">${title}</h2>
        ${body}
      </div>
      <div style="background:#2D211A;padding:20px;text-align:center;color:#fff;opacity:.7;font-size:12px;">
        ${siteConfig.address.full}<br/>${siteConfig.phone} · ${siteConfig.email}
      </div>
    </div>
  </div>`;
}

function detailRow(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 0;color:#999;font-size:13px;width:120px;">${label}</td>
    <td style="padding:8px 0;color:#333;font-size:14px;font-weight:600;">${value}</td>
  </tr>`;
}

export async function sendBookingEmails(
  booking: BookingPayload & { serviceName?: string }
) {
  if (!isEmailConfigured) {
    console.warn("[email] RESEND_API_KEY not configured — skipping booking emails.");
    return { sent: false };
  }

  const client = getClient();
  const serviceLabel = booking.serviceName || booking.service;

  const details = `
    <table style="width:100%;border-collapse:collapse;">
      ${detailRow("Service", serviceLabel)}
      ${detailRow("Date", booking.date)}
      ${detailRow("Time", booking.time)}
      ${detailRow("Name", booking.name)}
      ${detailRow("Phone", booking.phone)}
      ${detailRow("Email", booking.email)}
      ${booking.notes ? detailRow("Notes", booking.notes) : ""}
    </table>`;

  // Customer confirmation
  const customerHtml = shell(
    "Appointment Request Received",
    `<p style="line-height:1.7;">Dear ${booking.name},</p>
     <p style="line-height:1.7;">Thank you for booking with Royal Beauty Salon. We have received your appointment request and our team will contact you shortly to confirm.</p>
     <div style="background:#F8F3EE;border-radius:12px;padding:18px 20px;margin:20px 0;">${details}</div>
     <p style="line-height:1.7;">We can't wait to pamper you.</p>
     <p style="color:${ROSE};font-weight:600;">— The Royal Beauty Team</p>`
  );

  // Admin notification
  const adminHtml = shell(
    "New Appointment Request",
    `<p style="line-height:1.7;">A new appointment request has been submitted:</p>
     <div style="background:#F8F3EE;border-radius:12px;padding:18px 20px;margin:20px 0;">${details}</div>
     <p style="line-height:1.7;">Status: <strong>Pending</strong>. Review it in the admin dashboard.</p>`
  );

  await Promise.all([
    client.emails.send({
      from: fromEmail,
      to: booking.email,
      subject: "Appointment Request Received — Royal Beauty Salon",
      html: customerHtml,
    }),
    client.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `New Booking: ${serviceLabel} on ${booking.date}`,
      html: adminHtml,
    }),
  ]);

  return { sent: true };
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  if (!isEmailConfigured) {
    console.warn("[email] RESEND_API_KEY not configured — skipping contact email.");
    return { sent: false };
  }

  const client = getClient();

  await client.emails.send({
    from: fromEmail,
    to: adminEmail,
    replyTo: data.email,
    subject: `New Inquiry from ${data.name}`,
    html: shell(
      "New Contact Inquiry",
      `<table style="width:100%;border-collapse:collapse;">
        ${detailRow("Name", data.name)}
        ${detailRow("Email", data.email)}
        ${data.phone ? detailRow("Phone", data.phone) : ""}
      </table>
      <p style="margin-top:16px;line-height:1.7;color:#333;">${data.message}</p>`
    ),
  });

  return { sent: true };
}
