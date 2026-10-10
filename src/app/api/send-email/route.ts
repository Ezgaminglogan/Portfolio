import nodemailer from "nodemailer";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 100, email: 254, subject: 200, message: 5000 };

// ponytail: per-instance rate limit. Vercel can run several instances, each with
// its own window, so this deters bursts but is not a global guarantee. Move to a
// shared store (e.g. Upstash Redis) if spam ever gets past it.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  for (const [k, v] of requestLog) if (now > v.resetAt) requestLog.delete(k);
  const entry = requestLog.get(key);
  if (!entry) {
    requestLog.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

const HTML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (ch) => HTML_ENTITIES[ch] ?? ch);

const error = (message: string, status: number, headers?: HeadersInit) =>
  Response.json({ error: message }, { status, headers });

export async function POST(request: Request) {
  // Browsers always send Origin on cross-site POSTs; reject ones from other sites.
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return error("Forbidden", 403);
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return error("Too many messages. Please wait a few minutes and try again.", 429, {
      "Retry-After": String(RATE_LIMIT_WINDOW_MS / 1000),
    });
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return error("Invalid request body.", 400);
  }

  const { name, email, subject, message, website } = body as Record<string, unknown>;

  // Honeypot: bots fill the hidden "website" field; pretend success so they
  // don't learn to retry.
  if (typeof website === "string" && website.length > 0) {
    return Response.json({ message: "Message sent." });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim()
  ) {
    return error("Please fill in every field.", 400);
  }

  if (!EMAIL_REGEX.test(email.trim()) || email.length > MAX_LENGTHS.email) {
    return error("Please enter a valid email address.", 400);
  }

  if (
    name.length > MAX_LENGTHS.name ||
    subject.length > MAX_LENGTHS.subject ||
    message.length > MAX_LENGTHS.message
  ) {
    return error("One or more fields are too long.", 400);
  }

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Missing EMAIL_USER or EMAIL_PASSWORD env vars");
    return error("The message could not be sent right now.", 500);
  }

  try {
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim());

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email.trim(),
      subject: `Portfolio Contact: ${subject.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #F8FBF9;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; padding: 30px; border-radius: 12px; border: 1px solid #DDECE5;">
            <h2 style="color: #063F33; border-bottom: 2px solid #047857; padding-bottom: 10px;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject}</p>
            <div style="margin-top: 20px; padding: 16px; background-color: #F8FBF9; border-left: 4px solid #047857;">
              <p style="color: #142821; line-height: 1.6; white-space: pre-wrap; margin: 0;">${safeMessage}</p>
            </div>
            <p style="color: #52665C; font-size: 12px; margin-top: 24px;">Sent from the portfolio contact form.</p>
          </div>
        </div>
      `,
    });

    return Response.json({ message: "Message sent." });
  } catch (err) {
    // Log details server-side only; never return SMTP errors to the client.
    console.error("Error sending email:", err);
    return error("The message could not be sent right now.", 500);
  }
}
