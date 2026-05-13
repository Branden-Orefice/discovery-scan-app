import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  WpScanComponent,
  WpScanFinding,
  WpScanResult,
  WpScanContext,
  WpScanInterestingFinding,
} from "./types";

export const wpScanDbWriter = (
  supabase: SupabaseClient,
  context: WpScanContext,
) => {
  let rawScan: unknown | null = null;
  let components: WpScanComponent[] = [];
  let findings: WpScanFinding[] = [];
  let interestingFindings: WpScanInterestingFinding[] = [];

  const ingest = (scan: WpScanResult) => {
    rawScan = scan.raw;
    components.push(...scan.components);
    findings.push(...scan.findings);
    interestingFindings.push(...scan.interestingFindings);
  };

  const flushRawScan = async () => {
    if (!rawScan) return;

    const { error } = await supabase.from("wpscan_raw_results").upsert({
      scan_id: context.scanId,
      user_id: context.userId,
      target_url: context.targetUrl,
      raw_json: rawScan,
    });

    if (error) throw error;
  };

  const flushComponents = async () => {
    if (components.length === 0) return;

    const rows = components.map((component) => ({
      scan_id: component.scanId,
      user_id: context.userId,
      target_url: component.targetUrl,
      component_type: component.type,
      name: component.name,
      installed_version: component.installedVersion,
      latest_version: component.latestVersion,
      last_updated: component.lastUpdated,
      release_date: component.releaseDate,
      changelog_url: component.changelogUrl,
      popular: component.popular,
      status: component.status,
      outdated: component.outdated,
    }));

    const { error } = await supabase.from("wordpress_components").upsert(rows);

    if (error) throw error;

    components = [];
  };

  const flushFindings = async () => {
    if (findings.length === 0) return;

    const rows = findings.map((finding) => ({
      scan_id: finding.scanId,
      user_id: context.userId,
      wpscan_id: finding.wpscanId,
      vuln_type: finding.vulnType,
      old_id: finding.oldId,
      target_url: finding.targetUrl,
      component_type: finding.componentType,
      component_name: finding.componentName,
      component_friendly_name: finding.componentFriendlyName,
      description: finding.description,
      published_date: finding.publishedDate,
      created_at: finding.createdAt,
      updated_at: finding.updatedAt,
      cvss_score: finding.cvssScore,
      cvss_vector: finding.cvssVector,
      verified: finding.verified,
      fixed_in: finding.fixedIn,
      introduced_in: finding.introducedIn,
      closed: finding.closed,
      closed_reason: finding.closedReason,
      title: finding.title,
      severity: finding.severity,
      cve: finding.cve,
      reference: finding.reference,
      source: finding.source,
    }));

    const { error } = await supabase.from("wordpress_findings").upsert(rows);

    if (error) throw error;

    findings = [];
  };

  const flushInterestingFindings = async () => {
    if (interestingFindings.length === 0) return;

    const rows = interestingFindings.map((finding) => ({
      scan_id: finding.scanId,
      user_id: context.userId,
      url: finding.url,
      type: finding.type,
      interesting_entries: finding.interestingEntries,
      reference: finding.reference,
      source: finding.source,
    }));

    const { error } = await supabase
      .from("wordpress_interesting_findings")
      .upsert(rows);

    if (error) throw error;

    interestingFindings = [];
  };

  const flush = async () => {
    await flushRawScan();
    await flushComponents();
    await flushFindings();
    await flushInterestingFindings();
  };

  return {
    ingest,
    flush,
  };
};
