import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendEmail = async ({
  from,
  to,
  subject,
  html,
}: EmailOptions): Promise<boolean> => {
  const mailOptions = { from, to, subject, html };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
};
