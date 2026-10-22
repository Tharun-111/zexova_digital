import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const inquirySchema = z.object({
  kind: z.enum(["contact", "quote"]),
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  timeline: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little more (10+ characters)").max(3000),
  website: z.string().max(0).optional(), // honeypot
});

export type InquiryInput = z.infer<typeof inquirySchema>;

const RESEND_TEST_SENDER = "ZEXOVA <onboarding@resend.dev>";

async function sendInquiryNotification(data: InquiryInput, email: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_VERIFIED_FROM || RESEND_TEST_SENDER;
  const recipients = (process.env.INQUIRY_EMAIL_TO || "zexovadigital@gmail.com")
    .split(",")
    .map((recipient) => recipient.trim())
    .filter(Boolean);

  if (recipients.length === 0 || recipients.some((recipient) => !z.string().email().safeParse(recipient).success)) {
    console.error("Inquiry email recipient configuration is invalid");
    return { ok: false, error: "Email delivery is not configured correctly. Please try again later." };
  }

  if (!apiKey) {
    console.error("Inquiry email delivery is not configured", {
      missing: ["RESEND_API_KEY"],
    });
    return { ok: false, error: "Email delivery is not configured yet. Please try again later." };
  }

  const subject = data.kind === "quote" ? "New quote request" : "New contact message";
  const text = [
    `Type: ${data.kind === "quote" ? "Quote request" : "Contact message"}`,
    `Name: ${data.name}`,
    `Email: ${email}`,
    `Phone: ${data.phone || "Not provided"}`,
    `Business: ${data.company || "Not provided"}`,
    `Service: ${data.service || "Not provided"}`,
    ...(data.kind === "quote" ? [
      `Budget: ${data.budget || "Not provided"}`,
      `Timeline: ${data.timeline || "Not provided"}`,
    ] : []),
    "",
    "Message:",
    data.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: recipients, reply_to: email, subject, text }),
    });

    if (!response.ok) {
      console.error("Inquiry email notification failed", { status: response.status });
      return { ok: false, error: "Your message could not be sent. Please try again later." };
    }

    return { ok: true };
  } catch (error) {
    console.error("Inquiry email notification request failed", error);
    return { ok: false, error: "Your message could not be sent. Please try again later." };
  }
}

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inquirySchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const }; // silently drop bots
    const email = data.email.toLowerCase();
    return sendInquiryNotification(data, email);
  });
