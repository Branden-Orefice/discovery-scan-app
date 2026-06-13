import type { FullFinding } from "#/components/internal/helpers/fullFindingSchema.ts";

export const getTitle = (finding: FullFinding) => {
  if (finding.title && finding.title !== "[]") return finding.title;

  if (finding.finding_kind === "component") {
    return `${finding.component_name ?? "WordPress"} detected`;
  }

  if (finding.finding_kind === "outdated_component") {
    return `${finding.component_name ?? "Component"} is outdated`;
  }

  return "Untitled finding";
};