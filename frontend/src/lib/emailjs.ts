import emailjs from "@emailjs/browser";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const contactTemplateId = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID || "";
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export const isEmailJSConfigured = Boolean(serviceId && templateId && publicKey);

export async function sendBookingEmailJS(booking: {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes?: string;
}) {
  if (!isEmailJSConfigured) {
    console.warn("[EmailJS] Not configured — skipping booking email.");
    return { sent: false };
  }

  await emailjs.init(publicKey);

  await emailjs.send(serviceId, templateId, {
    from_name: booking.name,
    from_email: booking.email,
    phone: booking.phone,
    service: booking.service,
    date: booking.date,
    time: booking.time,
    notes: booking.notes || "None",
  });

  return { sent: true };
}

export async function sendContactEmailJS(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  if (!isEmailJSConfigured || !contactTemplateId) {
    console.warn("[EmailJS] Not configured — skipping contact email.");
    return { sent: false };
  }

  await emailjs.init(publicKey);

  await emailjs.send(serviceId, contactTemplateId, {
    from_name: data.name,
    from_email: data.email,
    phone: data.phone || "Not provided",
    message: data.message,
  });

  return { sent: true };
}
