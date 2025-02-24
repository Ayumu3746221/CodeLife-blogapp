import type { Contact } from "@/types/Contact";
import { transporter } from "./transporter";

export const sendMail = async (contactData: Contact): Promise<Boolean> => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MY_EMAIL_ADDRESS,
    subject: contactData.title,
    text: `From: ${contactData.email}\n\n${contactData.message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
