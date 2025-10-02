import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

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
      replyTo: email, // Allow replying to the sender
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #333;">Name:</strong> <span style="color: #666;">${name}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #333;">Email:</strong> <span style="color: #666;">${email}</span></p>
              <p style="margin: 10px 0;"><strong style="color: #333;">Subject:</strong> <span style="color: #666;">${subject}</span></p>
            </div>
            
            <div style="margin-top: 20px; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #10b981; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">Message:</h3>
              <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
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
