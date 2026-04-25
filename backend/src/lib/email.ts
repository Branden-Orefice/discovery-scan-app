import "dotenv/config";
import sgMail from "@sendgrid/mail";

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY is not defined in env variables");
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailPayload {
  to: string;
  subject?: string;
  templateId: string;
  dynamicTemplateData: Record<string, any>;
}

export const sendEmail = async ({to, subject, templateId, dynamicTemplateData,}: EmailPayload) => {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject,
    templateId,
    dynamicTemplateData,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error: any) {
    console.error("Failed to send email:", error?.response?.body || error);
    throw new Error("Email send failed");
  }
};