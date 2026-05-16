import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  WpScanComponent,
  WordfenceFinding,
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
  let findings: WordfenceFinding[] = [];
  let interestingFindings: WpScanInterestingFinding[] = [];

  const ingest = (scan: WpScanResult) => {
    rawScan = scan.raw;
    components.push(...scan.components);
    interestingFindings.push(...scan.interestingFindings);
  };

  const ingestWordfenceFindings = (newFindings: WordfenceFinding[]) => {
    findings.push(...newFindings);
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
      component_slug: component.slug,
      name: component.name,
      installed_version: component.installedVersion,
      latest_version: component.latestVersion ?? null,
      last_updated: component.lastUpdated ?? null,
      release_date: component.releaseDate ?? null,
      changelog_url: component.changelogUrl ?? null,
      outdated: component.outdated ?? null,
      status: component.status,
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
      target_url: finding.targetUrl,
      component_type: finding.componentType,
      component_name: finding.componentName,
      component_slug: finding.componentSlug,
      detected_version: finding.detectedVersion,
      wordfence_id: finding.wordfenceId,
      vuln_id: finding.vulnId,
      title: finding.title,
      severity: finding.severity,
      cve: finding.cve,
      cwe_name: finding.cweName,
      cwe_description: finding.cweDescription,
      cvss_score: finding.cvssScore,
      cvss_vector: finding.cvssVector,
      informational: finding.informational,
      reference: finding.reference,
      remediation: finding.remediation,
      source: finding.source,
    }));

    const { error } = await supabase.from("wordpress_findings").upsert(rows, {
      onConflict: "scan_id,wordfence_id",
    });

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
    ingestWordfenceFindings,
    flush,
  };
};
