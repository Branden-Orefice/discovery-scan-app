import React from "react";
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
    title: "Subdomain Enumeration",
    description:
      "Passive DNS, certificate transparency, brute-force, and API sources combined for near-complete subdomain coverage.",
  },
  {
    id: 2,
    icon: <ServerIcon />,
    title: "Port & Service Scanning",
    description:
      "Identify open ports, running services, and software versions across your entire IP space - flagging misconfigurations instantly.",
  },
  {
    id: 3,
    icon: <CloudIcon />,
    title: "Cloud Asset Discovery",
    description:
      "Find exposed S3 buckets, Azure blobs, GCP storage, and misconfigured cloud services before they become a breach.",
  },
  {
    id: 4,
    icon: <ShieldIcon />,
    title: "Vulnerability Correlation",
    description:
      "Correlate discovered technologies with CVE databases, surfacing critical vulnerabilities with CVSS scores and exploit availability.",
  },
  {
    id: 5,
    icon: <BellRingIcon />,
    title: "Change Detection",
    description:
      "Get alerted the moment a new subdomain appears, a port opens, or a certificate expires. Real-time monitoring, zero noise.",
  },
  {
    id: 6,
    icon: <ClipboardIcon />,
    title: "API & Integrations",
    description:
      "Full REST API, Slack webhooks, and SIEM integrations. Exportable reports in JSON, CSV, or PDF for compliance and stakeholders.",
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
          <p className="text-(--color-text-muted) md:text-md text-sm w-[40ch] absolute md:right-0 md:left-auto left-3 md:top-25 top-35">
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
