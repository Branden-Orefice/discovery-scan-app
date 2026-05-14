import type {
  WpScanFinding,
  WpScanResult,
  WpScanContext,
  WpScanComponent,
  WpScanInterestingFinding,
} from "./types";

import { firstCve, normalizeSeverity } from "./utils";

export const convertWpScanShape = (
  raw: any,
  context: WpScanContext,
): WpScanResult => {
  const components: WpScanComponent[] = [];
  const findings: WpScanFinding[] = [];
  const interestingFindings: WpScanInterestingFinding[] = [];

  const targetUrl = context.targetUrl;

  const coreVersion = raw?.version?.number ?? null;

  if (coreVersion) {
    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "core",
      name: "WordPress",
      installedVersion: coreVersion,
      status: raw?.version?.status ?? "unknown",
      releaseDate: raw?.version?.release_date ?? null,
    });

    for (const vuln of raw.version.vulnerabilities ?? []) {
      findings.push({
        scanId: context.scanId,
        wpscanId: vuln.id,
        targetUrl,
        componentType: "core",
        componentName: "WordPress",
        title: vuln?.title ?? "WordPress core vulnerability",
        severity: normalizeSeverity(vuln?.cvss?.severity),
        cve: firstCve(vuln),
        reference: vuln?.references ?? {},
        source: "wpscan",
      });
    }
  }

  for (const [pluginName, plugin] of Object.entries<any>(raw?.plugins ?? {})) {
    const vulnerabilities = plugin?.vulnerabilities ?? [];

    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "plugin",
      name: pluginName,
      installedVersion: plugin?.version?.number ?? null,
      latestVersion: plugin?.latest_version ?? null,
      status: vulnerabilities.length > 0 ? "vulnerable" : "unknown",
      outdated: plugin?.outdated ?? null,
    });

    for (const vuln of vulnerabilities) {
      findings.push({
        scanId: context.scanId,
        wpscanId: vuln.id,
        targetUrl,
        componentType: "plugin",
        componentName: pluginName,
        title: vuln?.title ?? `${pluginName} vulnerability`,
        severity: normalizeSeverity(vuln?.cvss?.severity),
        cve: firstCve(vuln),
        reference: vuln?.references ?? {},
        source: "wpscan",
      });
    }
  }

  const mainTheme = raw?.main_theme;

  if (mainTheme) {
    const themeName = mainTheme.slug ?? mainTheme.style_name ?? "unknown-theme";
    const vulnerabilities = mainTheme.vulnerabilities ?? [];

    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "theme",
      name: themeName,
      installedVersion: mainTheme?.version?.number ?? null,
      latestVersion: mainTheme?.latest_version ?? null,
      outdated: mainTheme?.outdated ?? null,
      status: vulnerabilities.length > 0 ? "vulnerable" : mainTheme?.outdated,
    });

    for (const vuln of vulnerabilities) {
      findings.push({
        scanId: context.scanId,
        wpscanId: vuln.id,
        targetUrl,
        componentType: "theme",
        componentName: themeName,
        title: vuln?.title ?? `${themeName} vulnerability`,
        severity: normalizeSeverity(vuln?.cvss?.severity),
        cve: firstCve(vuln),
        reference: vuln?.references ?? {},
        source: "wpscan",
      });
    }
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
    findings,
    interestingFindings,
  };
};
