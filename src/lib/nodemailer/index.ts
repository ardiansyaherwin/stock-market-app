import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replaceAll(
    "{{name}}",
    name
  ).replaceAll("{{intro}}", intro);
  const mailOptions = {
    from: `"Stock Market App" <sma@troiverse.com>`,
    to: email,
    subject: `Welcome to Stock Market App - your toolkit is ready`,
    text: "Thanks for joining Stock Market App",
    html: htmlTemplate,
  };
  await transporter.sendMail(mailOptions);
};
