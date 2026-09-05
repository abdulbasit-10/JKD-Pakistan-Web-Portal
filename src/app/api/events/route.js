import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { isValidName, isValidEmail, isValidPhone, isValidText } from "@/lib/validators";

export async function POST(req) {
  try {
    const {
      firstName, lastName, email, phoneNumber, eventType,
      cateringService, audioVisual, decorations, eventDateTime,
      paymentMethod, message,
    } = await req.json();

    if (
      !firstName || !lastName || !email || !phoneNumber || !eventType ||
      !cateringService || !audioVisual || !decorations || !eventDateTime || !paymentMethod
    ) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    // ✅ Regex validation
    if (!isValidName(firstName) || !isValidName(lastName)) {
      return NextResponse.json({ error: "Names must be valid (letters only)" }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!isValidPhone(phoneNumber)) {
      return NextResponse.json({ error: "Phone number must be 10-15 digits" }, { status: 400 });
    }
    if (message && !isValidText(message, 0, 1000)) {
      return NextResponse.json({ error: "Message is too long" }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

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

    const customerEmailContent = `
      <h2>Thank You for Your Event Booking Request!</h2>
      <p>Dear ${firstName},</p>
      <p>We have received your event booking request.</p>
      <p><strong>Event Type:</strong> ${eventType}</p>
      <p><strong>Event Date & Timing:</strong> ${eventDateTime}</p>
      <p><strong>Catering Service:</strong> ${cateringService}</p>
      <p><strong>Payment Method:</strong> ${paymentMethod}</p>
      <p>Our team will review your request and contact you soon at ${phoneNumber} or ${email}.</p>
      <p>Thank you for choosing JKD Organization!</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Event Booking Request from ${firstName} ${lastName}`,
      html: adminEmailContent,
    });

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
    return NextResponse.json({ success: false, error: "Failed to send email." }, { status: 500 });
  }
}
