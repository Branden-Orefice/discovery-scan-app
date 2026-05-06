import type {
  WpScanFinding,
  WpScanResult,
  WpScanContext,
  WpScanComponent,
} from "./types";

import { firstCve, normalizeSeverity } from "./utils";

export const convertWpScanShape = (
  raw: any,
  context: WpScanContext,
): WpScanResult => {
  const components: WpScanComponent[] = [];
  const findings: WpScanFinding[] = [];

  const targetUrl = context.targetUrl;

  const coreVersion = raw?.version?.number ?? null;

  if (coreVersion) {
    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "core",
      name: "WordPress",
      installedVersion: coreVersion,
      status: Array.isArray(raw?.version?.vulnerabilities)
      && raw.version.vulnerabilities.length > 0
        ? "vulnerable"
        : "outdated",
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
      status: vulnerabilities.length > 0 ? "vulnerable" : "unknown",
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

  for (const [themeName, theme] of Object.entries<any>(raw?.themes ?? {})) {
    const vulnerabilities = theme?.vulnerabilities ?? [];

    components.push({
      scanId: context.scanId,
      targetUrl,
      type: "theme",
      name: themeName,
      installedVersion: theme?.version?.number ?? null,
      status: vulnerabilities.length > 0 ? "vulnerable" : "unknown",
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

  return {
    raw,
    components,
    findings,
  };
}