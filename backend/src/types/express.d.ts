import { User, Session } from "better-auth";
import type { SupabaseClient } from "@supabase/supabase-js";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
      supabase?: SupabaseClient;

      context?: {
        user: { id: string };
        db: SupabaseClient;
      };
    }
  }
}
