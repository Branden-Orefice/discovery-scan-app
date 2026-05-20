import { z } from "zod";

export const fullFindingSchema = z.object({
  id: z.string(),
  target_url: z.string(),
  title: z.string(),
  severity: z.string(),
  cvss_score: z.number().nullable(),
  component_type: z.string(),
  created_at: z.string(),
  cve: z.string().nullable(),
  cwe_description: z.string().nullable(),
  remediation: z.string().nullable(),
});

const severities = ["critical", "high", "medium", "low", "info"] as const;

export const severitySchema = z.enum(severities);

export type Severity = z.infer<typeof severitySchema>;

export type FullFinding = z.infer<typeof fullFindingSchema>;

export const fullFindingListSchema = z.array(fullFindingSchema);
