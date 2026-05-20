import type { Finding } from "#/components/internal/dashboard/findings-table/helpers/findingSchema";

export const getFindingCountBySeverity = (
  findings: Finding[],
  severity: Finding["severity"],
) => {
  return findings.filter((finding) => finding.severity === severity).length;
};
