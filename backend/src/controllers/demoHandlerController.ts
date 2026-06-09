import "dotenv/config";
import { Request, Response } from "express";
import { auth } from "../lib/auth";

const DEMO_EMAIL = process.env.DEMO_EMAIL!;
const DEMO_PASSWORD = process.env.DEMO_PASSWORD!;

export const demoSignInHandler = async (req: Request, res: Response) => {
  try {
    const authResponse = await auth.api.signInEmail({
      body: {
        email: DEMO_EMAIL,
        password: DEMO_PASSWORD,
        rememberMe: false,
      },
      asResponse: true,
    });

    const cookie = authResponse.headers.get("set-cookie");

    if (cookie) {
      res.setHeader("Set-Cookie", cookie);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Error in demo sign-in handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
