import { z } from "zod";
import { referenceSchema } from "../vulnerabilites/vulnerability-table/helpers/referenceSchema";

export const fullFindingSchema = z.object({
  id: z.string(),
  target_url: z.string(),
  title: z.string(),
  severity: z.string(),
  cvss_score: z.number().nullable(),
  component_type: z.string(),
  component_name: z.string().nullable(),
  created_at: z.string(),
  cve: z.string().nullable(),
  cwe_description: z.string().nullable(),
  status: z.string().nullable(),
  description: z.string().nullable(),
  cve_link: z.string().nullable(),
  reference: referenceSchema,
  remediation: z.string().nullable(),
  finding_kind: z.string(),
});

const severities = ["critical", "high", "medium", "low", "info"] as const;

export const severitySchema = z.enum(severities);

export type Severity = z.infer<typeof severitySchema>;

export type FullFinding = z.infer<typeof fullFindingSchema>;

export const fullFindingListSchema = z.array(fullFindingSchema);
