export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { insertInquiry } from "@/lib/db";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, location, message, service, formType } = body;

    // Validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        { error: "Name, email, phone, and message are required fields." },
        { status: 400 }
      );
    }

    // 1. Log/Save the inquiry in Supabase / Local JSON file
    let savedInquiry = null;
    try {
      savedInquiry = await insertInquiry({
        name,
        email,
        phone,
        location: location || "",
        message,
        service: service || "",
        formType: formType || "contact_page",
      });
    } catch (dbError: any) {
      console.error("Error saving inquiry to database:", dbError);
      // We don't block email sending even if DB saving fails
    }

    // 2. Read SMTP environment variables
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_SECURE,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
    } = process.env;

    const isSmtpConfigured = !!(SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS);

    const emailSubject = `New Website Inquiry: ${name} (${formType || 'Contact Form'})`;
    
    const emailText = `You have received a new inquiry from the Trek Qatar website.

Details:
----------------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Location: ${location || "Not specified"}
Service: ${service || "Not specified"}
Form Type: ${formType || "Contact Form"}
Submitted At: ${new Date().toLocaleString()}

Message:
----------------------------------------
${message}
`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #0EA5E9; margin-top: 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">New Website Inquiry</h2>
        <p style="color: #374151; font-size: 16px;">You have received a new message from the <strong>Trek Qatar Website</strong>.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb; width: 30%;">Name:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Email:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="mailto:${email}" style="color: #0EA5E9; text-decoration: none;">${email}</a></td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Phone:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="tel:${phone}" style="color: #0EA5E9; text-decoration: none;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Location:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${location || "Not specified"}</td>
          </tr>
          <tr style="background-color: #f9fafb;">
            <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Service:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${service || "Not specified"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; border: 1px solid #e5e7eb;">Form Source:</td>
            <td style="padding: 10px; border: 1px solid #e5e7eb; text-transform: uppercase; font-size: 12px; font-weight: bold; color: #6b7280;">${formType || "contact_page"}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #f3f4f6; border-radius: 6px; border-left: 4px solid #0EA5E9;">
          <h4 style="margin: 0 0 10px 0; color: #1f2937;">Message:</h4>
          <p style="margin: 0; color: #4b5563; line-height: 1.5; white-space: pre-wrap;">${message}</p>
        </div>
        
        <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 30px; border-top: 1px solid #f3f4f6; padding-top: 15px;">
          This email was sent automatically from Trek Qatar Contact Form.
        </p>
      </div>
    `;

    if (!isSmtpConfigured) {
      console.warn("\n======================================================================");
      console.warn("⚠️  [SMTP WARNING] SMTP configuration is incomplete or missing in env.");
      console.warn("Inquiry was saved to database/local file.");
      console.warn("Attempting to send via Ethereal Mail fallback service for testing...");
      console.warn("======================================================================\n");

      let previewUrl = null;
      try {
        const testAccount = await nodemailer.createTestAccount();
        const testTransporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });

        const info = await testTransporter.sendMail({
          from: `"Trek Qatar Website Test" <${testAccount.user}>`,
          to: "info@trekgroups.com",
          replyTo: email,
          subject: emailSubject,
          text: emailText,
          html: emailHtml,
        });

        previewUrl = nodemailer.getTestMessageUrl(info);
        console.log("======================================================================");
        console.log("📨  [SMTP FALLBACK] Sent to Ethereal Test Mail Service!");
        console.log(`Preview URL: ${previewUrl}`);
        console.log("======================================================================\n");
      } catch (testMailError: any) {
        console.error("Ethereal test mail generation failed:", testMailError);
      }

      return NextResponse.json({
        success: true,
        message: "Message processed successfully. (SMTP not configured, captured locally)",
        previewUrl,
        savedInquiry,
      });
    }

    // 3. Send via Live SMTP
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT || "587"),
      secure: SMTP_SECURE === "true", // true for port 465, false for 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: SMTP_FROM || `"Trek Qatar Website" <${SMTP_USER}>`,
      to: "info@trekgroups.com",
      replyTo: email,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    console.log(`✉️ Email successfully sent to info@trekgroups.com for inquiry from ${name}`);

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
      savedInquiry,
    });
  } catch (error: any) {
    console.error("Error in POST /api/contact:", error);
    return NextResponse.json(
      { error: "Failed to send/process contact inquiry: " + error.message },
      { status: 500 }
    );
  }
}
