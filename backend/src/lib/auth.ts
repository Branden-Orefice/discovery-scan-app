import "dotenv/config";
import { pool } from "./database";
import { betterAuth } from "better-auth";
import {
  twoFactor,
  openAPI,
} from "better-auth/plugins";
// import { sendEmail } from "./emails/sendEmail";


const getTrustedOrigins = () => {
  if (process.env.NODE_ENV === "production") {
    return [process.env.FRONTEND_URI as string];
  }

  return [
    process.env.DEVELOPMENT_URI as string,
    process.env.BACKEND_URI as string,
  ];
};

export const auth = betterAuth({
  baseURL:
    (process.env.BETTER_AUTH_URL as string) ||
    (process.env.BACKEND_URI as string),
  database: pool,
  appName: "Atlas Recon",
  plugins: [
    twoFactor(),
    openAPI(),
  ],
  rateLimit: {
    window: 60,
    max: 100,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI:
        process.env.NODE_ENV === "production"
          ? `${process.env.FRONTEND_URI}/api/auth/callback/google`
          : `${process.env.BACKEND_URI}/api/auth/callback/google`,
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 12,
    maxPasswordLength: 64,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      // await sendEmail({
      //   to: user.email,
      //   subject: "Reset Your Password",
      //   templateId: process.env.PASSWORD_RESET as string,
      //   dynamicTemplateData: {
      //     userEmail: user.email,
      //     url,
      //     token,
      //   },
      // });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }): Promise<void> => {
      // await sendEmail({
      //   to: user.email,
      //   subject: "Verify Your Email",
      //   templateId: process.env.VERIFY_EMAIL as string,
      //   dynamicTemplateData: {
      //     name: user.name,
      //     url,
      //     token,
      //   },
      // });
    },
  },
  trustedOrigins: getTrustedOrigins(),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    freshAge: 60 * 5,
  },
  advanced: {
    cookiePrefix: "atlas-recon",
    useSecureCookies: process.env.NODE_ENV === "production",
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
});