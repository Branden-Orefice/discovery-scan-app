import {
  BellRingIcon,
  ClipboardIcon,
  CloudIcon,
  GlobeIcon,
  ServerIcon,
  ShieldIcon,
} from "lucide-react";

const featuresData = [
  {
    id: 1,
    icon: <GlobeIcon />,
    title: "WordPress Core Detection",
    description:
      "Identify WordPress versions, exposed endpoints, public metadata, and outdated core installations that may introduce unnecessary risk.",
  },
  {
    id: 2,
    icon: <ServerIcon />,
    title: "Plugin & Theme Visibility",
    description:
      "Detect installed plugins and themes, then compare discovered versions against known vulnerable releases.",
  },
  {
    id: 3,
    icon: <CloudIcon />,
    title: "WPScan-Powered Analysis",
    description:
      "Atlas Recon uses WPScan under the hood to inspect WordPress-specific attack surface without needing an agent installed on the site.",
  },
  {
    id: 4,
    icon: <ShieldIcon />,
    title: "Wordfence Enrichment",
    description:
      "Correlate WordPress findings with Wordfence vulnerability data, including CVEs, CVSS scores, affected versions, patched versions, and references.",
  },
  {
    id: 5,
    icon: <BellRingIcon />,
    title: "Severity-Based Prioritization",
    description:
      "Critical, high, medium, low, and informational findings are organized so teams can focus on the vulnerabilities that matter first.",
  },
  {
    id: 6,
    icon: <ClipboardIcon />,
    title: "Actionable Remediation",
    description:
      "Each finding includes clear context, affected components, references, and remediation details to help you patch faster.",
  },
];

const Features = () => {
  return (
    <div className="flex flex-col items-start border-t border-(--color-border-subtle)">
      <section id="features" className="container mx-auto">
        <div className="space-y-4 mt-20 relative">
          <span className="text-primary uppercase text-[10px] px-3 md:px-0 tracking-wide flex items-center gap-2">
            <span className="w-6 h-px bg-primary" />
            capabilities
          </span>

          <h2 className="md:text-3xl text-2xl px-3 md:px-0 font-bold w-[20ch]">
            Everything you need to see your full exposure
          </h2>
          <p className="text-(--color-text-muted) md:text-md text-sm w-[40ch] absolute md:right-0 md:left-auto left-3 top-25">
            Built for security teams who need continuous visibility - not
            quarterly pen tests.
          </p>
          <div className="grid md:grid-cols-3 grid-col-1 md:px-0 px-3 mt-20 mb-20">
            {featuresData.map((feature) => (
              <div
                key={feature.id}
                className="relative group flex flex-col items-start border border-(--color-border-subtle) py-8 px-6 gap-4 hover:bg-secondary/30"
              >
                <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[var(--brand-secondary)] via-[var(--primary)] to-[var(--destructive)] group-hover:w-full" />
                <span className="text-(--brand-secondary) border border-(--color-border-subtle) p-2 bg-secondary">
                  {feature.icon}
                </span>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="text-(--color-text-muted) w-[35ch] mt-2 text-sm md:w-[40ch] md:text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
