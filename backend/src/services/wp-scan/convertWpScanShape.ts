import type {
  WpScanResult,
  WpScanContext,
  WpScanComponent,
  WpScanInterestingFinding,
} from "./types";

export const convertWpScanShape = (
  raw: any,
  context: WpScanContext,
): WpScanResult => {
  const components: WpScanComponent[] = [];
  const interestingFindings: WpScanInterestingFinding[] = [];

  const targetUrl = context.targetUrl;

  const coreVersion = raw?.version?.number ?? null;

  if (coreVersion) {
    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "core",
      slug: "wordpress",
      name: "WordPress",
      installedVersion: coreVersion,
      status: raw?.version?.status ?? "unknown",
      releaseDate: raw?.version?.release_date ?? null,
    });
  }

  for (const [pluginName, plugin] of Object.entries<any>(raw?.plugins ?? {})) {
    if (pluginName === "*" || plugin?.slug === "*") continue;
    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "plugin",
      slug: plugin?.slug ?? pluginName,
      name: pluginName,
      installedVersion: plugin?.version?.number ?? null,
      latestVersion: plugin?.latest_version ?? null,
      lastUpdated: plugin?.last_updated ?? null,
      outdated: plugin?.outdated ?? null,
      status: plugin?.outdated ?? "unknown",
    });
  }

  const mainTheme = raw?.main_theme;

  if (mainTheme) {
    const themeName = mainTheme.slug ?? mainTheme.style_name ?? "unknown-theme";

    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "theme",
      slug: mainTheme.slug ?? themeName,
      name: themeName,
      installedVersion: mainTheme?.version?.number ?? null,
      latestVersion: mainTheme?.latest_version ?? null,
      outdated: mainTheme?.outdated ?? null,
      status: mainTheme?.status ?? "unknown",
    });
  }

  for (const interestingFinding of raw?.interesting_findings ?? []) {
    interestingFindings.push({
      scanId: context.scanId,
      url: interestingFinding.url,
      type: interestingFinding.type,
      interestingEntries: interestingFinding.interesting_entries ?? [],
      reference: interestingFinding.references ?? {},
      source: "wpscan",
    });
  }

  return {
    raw,
    components,
    findings: [], // findings will be enriched later with Wordfence data
    interestingFindings,
  };
};
