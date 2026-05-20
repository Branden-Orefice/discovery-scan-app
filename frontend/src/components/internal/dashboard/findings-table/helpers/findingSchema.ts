import { z } from "zod";

export const findingSchema = z.object({
  id: z.string(),
  target_url: z.string(),
  title: z.string(),
  severity: z.string(),
  component_type: z.string(),
  created_at: z.string(),
});

const severities = ["critical", "high", "medium", "low", "info"] as const;

export const severitySchema = z.enum(severities);

export type Severity = z.infer<typeof severitySchema>;

export type Finding = z.infer<typeof findingSchema>;
