/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NewScanModal from "../NewScanModal";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

// Mocking some Lucide icons to avoid issues
vi.mock("lucide-react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("lucide-react")>();
  return {
    ...actual,
    ChevronDownIcon: () => <div data-testid="chevron-down" />,
    ChevronLeftIcon: () => <div data-testid="chevron-left" />,
    OctagonPauseIcon: () => <div data-testid="octagon-pause" />,
    HardHat: () => <div data-testid="hard-hat" />,
  };
});

// Mocking UI components that might use complex Radix primitives or features not fully supported in JSDOM
// Especially Popover and Calendar which can be tricky
vi.mock("#/components/ui/calendar", () => ({
  Calendar: () => <div data-testid="calendar-mock" />,
}));

describe("NewScanModal Component", () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders the trigger button initially", () => {
    renderWithClient(<NewScanModal />);
    expect(screen.getByText(/New Scan/i)).toBeTruthy();
  });

  it("opens the modal and shows step 1", () => {
    renderWithClient(<NewScanModal />);
    const trigger = screen.getByText(/New Scan/i);
    fireEvent.click(trigger);

    expect(screen.getByText(/01/)).toBeTruthy();
    expect(screen.getByText(/Target/)).toBeTruthy();
    expect(screen.getByLabelText(/WordPress Site Url/i)).toBeTruthy();
  });

  it("shows an error message when the URL is empty and continue is clicked", () => {
    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    // Try to click continue without entering a URL
    fireEvent.click(screen.getByText(/Continue/i));

    // Should show error message
    expect(screen.getByText(/WordPress Site URL is required/i)).toBeTruthy();

    // Entering a URL should clear the error
    const targetInput = screen.getByLabelText(/WordPress Site Url/i);
    fireEvent.change(targetInput, { target: { value: "https://test.com" } });
    expect(screen.queryByText(/WordPress Site URL is required/i)).toBeNull();
  });

  it("navigates through the steps correctly", () => {
    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    // Step 1 -> Step 2
    const targetInput = screen.getByLabelText(/WordPress Site Url/i);
    fireEvent.change(targetInput, { target: { value: "https://test.com" } });
    fireEvent.click(screen.getByText(/Continue/i));

    expect(screen.getByText(/02/)).toBeTruthy();
    expect(screen.getByText(/Select Scan Type/i)).toBeTruthy();

    // Step 2 -> Step 3
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/03/)).toBeTruthy();
    expect(screen.getByText(/Active Modules/i)).toBeTruthy();

    // Step 3 -> Step 4
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/04/)).toBeTruthy();
    expect(screen.getAllByText(/Schedule/i).length).toBeGreaterThan(0);

    // Step 4 -> Step 5 (Review)
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/05/)).toBeTruthy();
    expect(screen.getByText(/Review/i)).toBeTruthy();
    
    // Verify summary info in Step 5
    expect(screen.getAllByText("https://test.com").length).toBeGreaterThan(0);
  });

  it("prevents navigating to step 2 if the URL is empty", () => {
    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    // Try to click continue without entering a URL
    fireEvent.click(screen.getByText(/Continue/i));

    // Should still be on step 1
    // The active step span for 01 will have different classes than the others
    const step1Indicator = screen.getByText("01");
    expect(step1Indicator.className).toContain("text-primary");
    
    // Step 02 should NOT be active
    const step2Indicator = screen.getByText("02");
    expect(step2Indicator.className).not.toContain("text-primary");

    expect(screen.getByLabelText(/WordPress Site Url/i)).toBeTruthy();
  });

  it("handles the URL input correctly (text entry)", () => {
    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    const targetInput = screen.getByLabelText(/WordPress Site Url/i) as HTMLInputElement;
    
    // Test typing into the input
    fireEvent.change(targetInput, { target: { value: "https://my-awesome-site.com" } });
    expect(targetInput.value).toBe("https://my-awesome-site.com");

    // Test that it persists through steps to the review
    fireEvent.click(screen.getByText(/Continue/i)); // Step 2
    fireEvent.click(screen.getByText(/Continue/i)); // Step 3
    fireEvent.click(screen.getByText(/Continue/i)); // Step 4
    fireEvent.click(screen.getByText(/Continue/i)); // Step 5 (Review)

    expect(screen.getAllByText("https://my-awesome-site.com").length).toBeGreaterThan(0);
  });

  it("handles the Scan Label input correctly (optional text entry)", () => {
    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    const labelInput = screen.getByLabelText(/Scan Label \(optional\)/i) as HTMLInputElement;
    
    fireEvent.change(labelInput, { target: { value: "Monthly Security Audit" } });
    expect(labelInput.value).toBe("Monthly Security Audit");

    // Move to Step 2 (need URL)
    fireEvent.change(screen.getByLabelText(/WordPress Site Url/i), { target: { value: "https://test.com" } });
    
    // Go to Review step
    for (let i = 0; i < 4; i++) {
      fireEvent.click(screen.getByText(/Continue/i));
    }

    expect(screen.getAllByText("Monthly Security Audit").length).toBeGreaterThan(0);
  });

  it("shows a default scan label in review if none is provided", () => {
    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    // Move to Step 2 (need URL)
    fireEvent.change(screen.getByLabelText(/WordPress Site Url/i), { target: { value: "https://test.com" } });
    
    // Go to Review step
    for (let i = 0; i < 4; i++) {
      fireEvent.click(screen.getByText(/Continue/i));
    }

    // Should show the default label: "Scan for https://test.com"
    expect(screen.getAllByText("Scan for https://test.com").length).toBeGreaterThan(0);
  });

  it("allows going back to previous steps", () => {
    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    // Move to Step 2
    fireEvent.change(screen.getByLabelText(/WordPress Site Url/i), { target: { value: "https://test.com" } });
    fireEvent.click(screen.getByText(/Continue/i));
    expect(screen.getByText(/02/)).toBeTruthy();

    // Go back to Step 1
    fireEvent.click(screen.getByText(/Back/i));
    expect(screen.getByText(/01/)).toBeTruthy();
    expect((screen.getByLabelText(/WordPress Site Url/i) as HTMLInputElement).value).toBe("https://test.com");
  });

  it("updates scan type and shows it in review", () => {
    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    // Step 1
    fireEvent.change(screen.getByLabelText(/WordPress Site Url/i), { target: { value: "https://test.com" } });
    fireEvent.click(screen.getByText(/Continue/i));

    // Step 2: Select Aggressive
    fireEvent.click(screen.getByText(/Aggressive/i));
    fireEvent.click(screen.getByText(/Continue/i));

    // Step 3, 4
    fireEvent.click(screen.getByText(/Continue/i));
    fireEvent.click(screen.getByText(/Continue/i));

    // Step 5: Review
    expect(screen.getByText(/aggressive/i)).toBeTruthy();
  });

  it("handles alert checkboxes correctly", () => {
    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    // Step 1: URL required
    fireEvent.change(screen.getByLabelText(/WordPress Site Url/i), { target: { value: "https://test.com" } });
    fireEvent.click(screen.getByText(/Continue/i));

    // Skip to Step 4
    fireEvent.click(screen.getByText(/Continue/i)); // to step 3
    fireEvent.click(screen.getByText(/Continue/i)); // to step 4

    const emailCheckbox = screen.getByLabelText(/Email/i, { selector: 'input' });
    const slackCheckbox = screen.getByLabelText(/Slack/i, { selector: 'input' });

    fireEvent.click(emailCheckbox);
    fireEvent.click(slackCheckbox);

    fireEvent.click(screen.getByText(/Continue/i)); // to step 5

    expect(screen.getByText(/Email \+ Slack/i)).toBeTruthy();
  });

  it("closes the modal and resets the form on successful scan launch", async () => {
    // Mock successful fetch
    const mockResponse = { success: true };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    renderWithClient(<NewScanModal />);
    fireEvent.click(screen.getByText(/New Scan/i));

    // Fill out Step 1
    fireEvent.change(screen.getByLabelText(/WordPress Site Url/i), { target: { value: "https://test.com" } });
    fireEvent.click(screen.getByText(/Continue/i));

    // Move to Step 5
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByText(/Continue/i));
    }

    expect(screen.getByText(/05/)).toBeTruthy();
    const launchButton = screen.getByText(/Launch Scan/i);
    fireEvent.click(launchButton);

    // Verify fetch was called
    expect(global.fetch).toHaveBeenCalledWith("/api/scan", expect.any(Object));

    // Modal should close (DialogContent should be gone from the DOM or hidden)
    // In many Radix implementations, it's removed from the DOM
    await waitFor(() => {
      expect(screen.queryByText(/Review/i)).toBeNull();
    });

    // Re-opening the modal should show Step 1 (reset state)
    fireEvent.click(screen.getByText(/New Scan/i));
    expect(screen.getByText(/01/)).toBeTruthy();
    expect((screen.getByLabelText(/WordPress Site Url/i) as HTMLInputElement).value).toBe("");
  });
});
