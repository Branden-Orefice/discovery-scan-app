import { ScanLineIcon, RadarIcon, GaugeIcon } from "lucide-react";

const howItWorksData = [
  {
    id: 1,
    step: "// Step 01",
    icon: <ScanLineIcon />,
    title: "Scan your WordPress site",
    description:
      "Enter a WordPress URL and Atlas Recon launches a WPScan-powered assessment against the site, its exposed WordPress surface, plugins, themes, and core version.",
  },
  {
    id: 2,
    step: "// Step 02",
    icon: <RadarIcon />,
    title: "Enrich every finding",
    description:
      "Detected WordPress components are matched against Wordfence vulnerability intelligence to surface CVEs, affected versions, severity, references, and remediation guidance.",
  },
  {
    id: 3,
    step: "// Step 03",
    icon: <GaugeIcon />,
    title: "Prioritize what matters",
    description:
      "Atlas Recon organizes findings by risk so you can quickly identify vulnerable plugins, outdated themes, exposed WordPress services, and issues that need immediate action.",
  },
];

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-start border-t border-(--color-border-subtle)">
      <section id="how-it-works" className="container mx-auto">
        <div className="space-y-4 mt-20">
          <span className="text-primary uppercase md:px-0 px-3 text-[10px] tracking-wide flex items-center gap-2">
            <span className="w-6 h-px bg-primary" />
            How It Works
          </span>
          <h2 className="md:text-3xl px-3 md:px-0 text-2xl font-bold">
            Recon in three steps
          </h2>
          <p className="text-(--color-text-muted) md:w-[50ch] w-[40ch] px-3 md:px-0 text-sm md:text-md">
            From a single WordPress URL, Atlas Recon uncovers vulnerable
            plugins, themes, and core versions, then prioritizes what needs
            attention first.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 mt-10 mb-20 px-3 md:px-0">
          {howItWorksData.map((step) => (
            <div
              key={step.id}
              className="group relative flex flex-col items-start border border-(--color-border-subtle) py-8 px-6 gap-4 hover:bg-secondary/30 transition-colors duration-300"
            >
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[var(--brand-secondary)] via-[var(--primary)] to-[var(--destructive)] transition-all duration-300 group-hover:w-full" />
              <span className="text-(--color-text-muted) text-[12px] uppercase tracking-wide">
                {step.step}
              </span>
              <div className="text-primary border border-(--color-border-subtle) p-2 bg-secondary">
                {step.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-(--color-text-muted) md:w-[40ch] w-[35ch] mt-2 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
