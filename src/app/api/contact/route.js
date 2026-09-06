import nodemailer from "nodemailer";
import { isValidEmail, isValidPhone, isValidText, escapeHtml } from "@/lib/validators";

export async function POST(req) {
  try {
    const { userName, email, subject, message, phoneNumber } = await req.json();

    if (!email || !phoneNumber || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Email, phone number, and message are required." }),
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid email address." }),
        { status: 400 }
      );
    }

    if (!isValidPhone(phoneNumber)) {
      return new Response(
        JSON.stringify({ success: false, error: "Phone number must be 10-15 digits." }),
        { status: 400 }
      );
    }

    if (userName && !isValidText(userName, 2, 80)) {
      return new Response(
        JSON.stringify({ success: false, error: "Name must be between 2 and 80 characters." }),
        { status: 400 }
      );
    }

    if (!isValidText(message, 5, 2000)) {
      return new Response(
        JSON.stringify({ success: false, error: "Message must be between 5 and 2000 characters." }),
        { status: 400 }
      );
    }

    if (subject && !isValidText(subject, 2, 150)) {
      return new Response(
        JSON.stringify({ success: false, error: "Subject must be between 2 and 150 characters." }),
        { status: 400 }
      );
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Email service is not configured. Please set EMAIL_USER and EMAIL_PASS in environment variables.",
        }),
        { status: 500 }
      );
    }

    const senderName = (userName || "Website Visitor").trim();
    const safeSubject = (subject || "New Contact Form Submission").trim();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      family: 4, // ✅ IPv6 timeout se bachne ke liye
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${escapeHtml(senderName)}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: safeSubject,
      text: message,
      html: `<p><b>Name:</b> ${escapeHtml(senderName)}</p><p><b>Email:</b> ${escapeHtml(email)}</p><p><b>Number:</b> ${escapeHtml(phoneNumber)}</p><p>${escapeHtml(message)}</p>`,
    });

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ success: false, error: "Failed to send email." }), { status: 500 });
  }
}
