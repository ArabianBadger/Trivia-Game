import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const SENDER_EMAIL = process.env.GOOGLE_SENDER_EMAIL;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendEmail(to, subject, message) {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString("base64")}?=`;
    const messageParts = [
      `From: ${SENDER_EMAIL}`,
      `To: ${to}`,
      `Content-Type: text/html; charset=utf-8`,
      `MIME-Version: 1.0`,
      `Subject: ${utf8Subject}`,
      "",
      message,
    ];
    const messageBody = messageParts.join("\n");

    const encodedEmail = Buffer.from(messageBody)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: encodedEmail,
      },
    });

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}

function composeEmail(to, subject, message) {
  const mailOptions = {
    from: SENDER_EMAIL,
    to: to,
    subject: subject,
    html: message,
  };
  return mailOptions;
}

export async function sendOTPEmail(email, otp, username) {
  const subject = "Trivia Game Verification Code";
  const message = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #007bff;">Trivia Game Verification</h2>
      <p>Hi ${username},</p>
      <p>Here's your verification code:</p>
      <div style="background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
        ${otp}
      </div>
      <p>This code expires in 10 minutes.</p>
      <p>If you didn't sign up, ignore this email.</p>
      <hr style="margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">Trivia Game Team</p>
    </div>
  `;

  const result = await sendEmail(email, subject, message);
  
  if (result) {
    console.log("Email sent successfully to:", email);
  } else {
    console.error("Failed to send email to:", email);
  }
  
  return result;
}
