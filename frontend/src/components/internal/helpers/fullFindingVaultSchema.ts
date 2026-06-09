import { z } from "zod";
import { referenceSchema } from "../vulnerabilites/vulnerability-table/helpers/referenceSchema";

export const fullFindingVaultSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  software_type: z.string().optional().nullable(),
  software_name: z.string().optional().nullable(),
  affected_versions: z.any().optional().nullable(),
  patched: z.boolean().optional().nullable(),
  patched_versions: z.any().optional().nullable(),
  remediation: z.string().nullable(),
  informational: z.boolean().optional().nullable(),
  description: z.string().nullable(),
  reference: referenceSchema,
  cwe: z.any().optional().nullable(),
  severity: z.string(),
  cvss_score: z.number().nullable(),
  cvss_vector: z.string().optional().nullable(),
  cve: z.string().nullable(),
  researchers: z.string().optional().nullable(),
  cve_link: z.string().nullable(),
  published: z.string(),
  updated: z.string().optional().nullable(),
  cvss: z.any().optional().nullable(),
});

const severities = ["critical", "high", "medium", "low", "info"] as const;

export const severitySchema = z.enum(severities);

export type Severity = z.infer<typeof severitySchema>;

export type FullFindingVault = z.infer<typeof fullFindingVaultSchema>;

export const fullFindingVaultListSchema = z.array(fullFindingVaultSchema);
