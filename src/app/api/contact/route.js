import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { userName, email, subject, message, phoneNumber } = await req.json();

    if (!email || !phoneNumber || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Email, phone number, and message are required." }),
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

    // Create transporter (use your own SMTP credentials)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"${senderName}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // receiver
      subject: safeSubject,
      text: message,
      html: `<p><b>Name:</b> ${senderName}</p><p><b>Email:</b> ${email}</p><p><b>Number:</b> ${phoneNumber}</p><p>${message}</p>`,
    });

    return new Response(JSON.stringify({ success: true, message: "Email sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    const errorMessage = error?.message || "Failed to send email.";
    return new Response(JSON.stringify({ success: false, error: errorMessage }), { status: 500 });
  }
}


// this can be also done using below code but it need resend library and resend api key 



// // app/api/send-mail/route.js
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req) {
//   const { name, email, message } = await req.json();

//   await resend.emails.send({
//     from: "Your App <onboarding@resend.dev>",
//     to: "your@gmail.com",
//     subject: `Message from ${name}`,
//     html: `<p>${message}</p>`,
//   });

//   return new Response(JSON.stringify({ success: true }), { status: 200 });
// }
