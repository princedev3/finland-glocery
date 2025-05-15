import { VerifyEmailTemplate } from "@/emails/verify-email";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { render } from "@react-email/render";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS_KEY,
  },
});
export const sendVerificationEmail = async (email: string, token: string,path:string) => {
  const confirmLink = `${process.env.NEXT_PUBLIC_BASE_URL}/${path}?token=${token}`;
  const htmlContent = await render(<VerifyEmailTemplate confirmLink={confirmLink} />);
  const mailOptions: Mail.Options = {
    from:process.env.NODEMAILER_USER,
    to: email,
    subject: "Email Confirmation",
    html:htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

