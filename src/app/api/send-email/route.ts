import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LENGTHS = { name: 100, email: 254, subject: 200, message: 5000 };

// Best-effort per-instance rate limit. On serverless, each warm instance keeps
// its own window — meaningful deterrence, not a guarantee.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = requestLog.get(key);
  if (!entry || now > entry.resetAt) {
    requestLog.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (ch) => HTML_ENTITIES[ch] ?? ch);

export async function POST(request: Request) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error("Missing EMAIL_USER or EMAIL_PASSWORD env vars");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { name, email, subject, message, website } = body as Record<
    string,
    unknown
  >;

  // Honeypot: bots fill the hidden "website" field; pretend success so they
  // don't learn to retry.
  if (typeof website === 'string' && website.length > 0) {
    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  }

  // Validate input
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof subject !== 'string' ||
    typeof message !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !subject.trim() ||
    !message.trim()
  ) {
    return NextResponse.json(
      { error: 'All fields are required' },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email.trim()) || email.length > MAX_LENGTHS.email) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 }
    );
  }

  if (
    name.length > MAX_LENGTHS.name ||
    subject.length > MAX_LENGTHS.subject ||
    message.length > MAX_LENGTHS.message
  ) {
    return NextResponse.json(
      { error: 'One or more fields exceed the allowed length' },
      { status: 400 }
    );
  }

  try {
    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeSubject = escapeHtml(subject.trim());
    const safeMessage = escapeHtml(message.trim());

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to other services
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email app password
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email.trim(), // Allow replying to the sender
      subject: `Portfolio Contact: ${subject.trim().slice(0, MAX_LENGTHS.subject)}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">New Contact Form Submission</h2>

            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong> <span style="color: #666;">${safeName}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> <span style="color: #666;">${safeEmail}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #333;">Subject:</strong> <span style="color: #666;">${safeSubject}</span></p>
            </div>

            <div style="margin-top: 20px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #10b981; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">Message:</h3>
              <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${safeMessage}</p>
            </div>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px;">This email was sent from your portfolio contact form.</p>
            </div>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
