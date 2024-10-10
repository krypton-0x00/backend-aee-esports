import { Resend } from "resend";
import dotenv from "dotenv";
import { SendMail } from "../types/sendmail.types.js";

dotenv.config();

const resend = new Resend(process.env.RESEND_API);

export default async function sendMail({ to, subject, message }: SendMail) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: message,
    });
    if (error) {
      return console.error({ error });
    }

    console.log({ data });
  } catch (error) {
    console.error({ error });
  }
}
