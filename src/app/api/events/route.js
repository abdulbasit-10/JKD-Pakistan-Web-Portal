import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      eventType,
      cateringService,
      audioVisual,
      decorations,
      eventDateTime,
      paymentMethod,
      message,
    } = await req.json();

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !eventType ||
      !cateringService ||
      !audioVisual ||
      !decorations ||
      !eventDateTime ||
      !paymentMethod
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        {
          error: "Email service is not configured. Please set EMAIL_USER and EMAIL_PASS in environment variables.",
        },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content for admin
    const adminEmailContent = `
      <h2>New Event Booking Request</h2>
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Catering Service:</strong> ${cateringService}</p>
      <p><strong>Audio/Visual Equipment:</strong> ${audioVisual}</p>
      <p><strong>Decorations:</strong> ${decorations}</p>
      <p><strong>Event Date & Timing:</strong> ${eventDateTime}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p><strong>Message:</strong> ${message || "No additional message"}</p>
    `;

    // Email content for customer
    const customerEmailContent = `
      <h2>Thank You for Your Event Booking Request!</h2>
      <p>Dear ${firstName},</p>
      <p>We have received your event booking request. Here are your submission details:</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Event Date & Timing:</strong> ${eventDateTime}</p>
      <p><strong>Catering Service:</strong> ${cateringService}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p>Our team will review your request and contact you soon at ${phoneNumber} or ${email}.</p>
      <p>Thank you for choosing JKD Organization!</p>
      <p>Best regards,<br/>JKD Organization Team</p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Event Booking Request from ${firstName} ${lastName}`,
      html: adminEmailContent,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Event Booking Request Confirmation - JKD Organization",
      html: customerEmailContent,
    });

    return NextResponse.json(
      { message: "Your message has been submitted successfully!", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to send email." },
      { status: 500 }
    );
  }
}
