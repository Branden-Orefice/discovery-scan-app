/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, within, cleanup } from "@testing-library/react";
import DashboardHome from "../HomePage";
import { useAllFindings } from "#/components/internal/dashboard/hooks/useAllFindings";

// Mocking the hooks
vi.mock("#/components/internal/dashboard/hooks/useAllFindings", () => ({
  useAllFindings: vi.fn(),
}));

// Mocking utility
vi.mock("#/utils/getFindingCountBySeverity", () => ({
  getFindingCountBySeverity: vi.fn((findings, severity) => {
    if (!findings) return 0;
    return findings.filter((f: any) => f.severity === severity).length;
  }),
}));

// Mocking sub-components to isolate HomePage
vi.mock("#/components/internal/dashboard/StatCard", () => ({
  default: ({ title, value, loading }: { title: string; value: any; loading?: boolean }) => (
    <div data-testid={`stat-card-${title}`}>
      <span className="title">{title}</span>
      <span className="value">{loading ? "Loading..." : String(value)}</span>
    </div>
  ),
}));

vi.mock("#/components/internal/dashboard/ActiveScanCard", () => ({
  default: () => <div data-testid="active-scan-card">ActiveScanCard</div>,
}));

vi.mock("#/components/internal/dashboard/AssetBreakdownCard", () => ({
  default: ({ findings }: { findings: any[] }) => (
    <div data-testid="asset-breakdown-card">AssetBreakdown: {findings?.length || 0}</div>
  ),
}));

vi.mock("#/components/internal/dashboard/GlobalVulnCard", () => ({
  default: () => <div data-testid="global-vuln-card">GlobalVulnCard</div>,
}));

vi.mock("#/components/internal/dashboard/RiskScoreCard", () => ({
  default: ({ findings }: { findings: any[] }) => (
    <div data-testid="risk-score-card">RiskScore: {findings?.length || 0}</div>
  ),
}));

vi.mock("#/components/internal/dashboard/findings-table/DashboardFindingsColumns.tsx", () => ({
  default: [],
}));

vi.mock("#/components/internal/dashboard/findings-table/DashboardFindingsTable.tsx", () => ({
  default: ({ data, loading }: { data: any[]; loading: boolean }) => (
    <div data-testid="findings-table">
      {loading ? "TableLoading" : `TableRows: ${data?.length || 0}`}
    </div>
  ),
}));

describe("DashboardHome Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("renders correctly with findings data", () => {
    const mockFindings = [
      { id: "1", severity: "critical" },
      { id: "2", severity: "critical" },
      { id: "3", severity: "high" },
      { id: "4", severity: "medium" },
    ];

    (useAllFindings as any).mockReturnValue({
      findings: mockFindings,
      isLoading: false,
    });

    render(<DashboardHome />);

    // Verify StatCards display correct counts
    const criticalStat = screen.getByTestId("stat-card-critical");
    expect(within(criticalStat).getByText("2")).toBeTruthy();

    const highStat = screen.getByTestId("stat-card-high");
    expect(within(highStat).getByText("1")).toBeTruthy();

    const totalAssetsStat = screen.getByTestId("stat-card-total assets");
    expect(within(totalAssetsStat).getByText("4")).toBeTruthy();

    // Verify child components received data
    expect(screen.getByTestId("risk-score-card").textContent).toContain("RiskScore: 4");
    expect(screen.getByTestId("asset-breakdown-card").textContent).toContain("AssetBreakdown: 4");
    expect(screen.getByTestId("findings-table").textContent).toContain("TableRows: 4");
  });

  it("shows loading state when data is being fetched", () => {
    (useAllFindings as any).mockReturnValue({
      findings: [],
      isLoading: true,
    });

    render(<DashboardHome />);

    // Verify StatCards show loading
    const criticalStat = screen.getByTestId("stat-card-critical");
    expect(within(criticalStat).getByText("Loading...")).toBeTruthy();

    // Verify Table shows loading
    expect(screen.getByTestId("findings-table").textContent).toBe("TableLoading");
  });

  it("handles empty findings list gracefully", () => {
    (useAllFindings as any).mockReturnValue({
      findings: [],
      isLoading: false,
    });

    render(<DashboardHome />);

    const totalAssetsStat = screen.getByTestId("stat-card-total assets");
    expect(within(totalAssetsStat).getByText("0")).toBeTruthy();

    expect(screen.getByTestId("findings-table").textContent).toBe("TableRows: 0");
  });

  it("handles unexpected data types in findings (data robustness)", () => {
    // Testing with null/undefined values or missing fields
    const abnormalFindings = [
      { id: "1", severity: "critical" },
      { id: "2", severity: null }, // Null severity
      { id: "3" }, // Missing severity field
      { id: "4", severity: "unknown-type" }, // Unexpected severity string
    ];

    (useAllFindings as any).mockReturnValue({
      findings: abnormalFindings,
      isLoading: false,
    });

    render(<DashboardHome />);

    // Total assets should still count the items
    const totalAssetsStat = screen.getByTestId("stat-card-total assets");
    expect(within(totalAssetsStat).getByText("4")).toBeTruthy();

    // Critical should only be 1 (from first item)
    const criticalStat = screen.getByTestId("stat-card-critical");
    expect(within(criticalStat).getByText("1")).toBeTruthy();
    
    // High and Medium should be 0
    const highStat = screen.getByTestId("stat-card-high");
    expect(within(highStat).getByText("0")).toBeTruthy();
  });
});
