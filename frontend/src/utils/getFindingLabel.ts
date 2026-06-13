import type { FullFinding } from "#/components/internal/helpers/fullFindingSchema.ts";

export const getFindingLabel = (finding: FullFinding) => {
  switch (finding.finding_kind) {
    case "outdated_component":
      return "Outdated Component";
    case "component":
      return "Detected Component";
    case "interesting":
      return "Configuration Finding";
    default:
      return "Vulnerability";
  }
};