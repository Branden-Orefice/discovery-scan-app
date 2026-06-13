import { Button } from "#/components/ui/button.tsx";
import { ArrowRight, ScanLineIcon } from "lucide-react";
import FloatingOrbs from "@/components/FloatingOrbs.tsx";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const Hero = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitDemo = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Demo sign-in failed");
      if (response.ok) {
        navigate({ to: "/auth/callback" });
      }
    } catch (error) {
      console.error("An unexpected error occurred during demo sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <FloatingOrbs />
      <section className="container mx-auto flex flex-col mt-45 items-center space-y-8 justify-center">
        <h1 className="md:text-6xl font-bold items-center flex flex-col text-4xl">
          Find WordPress
          <br />
          <span className="text-primary">
            vulnerabilities
            <br />
          </span>
          before attackers do
        </h1>
        <h2 className="md:text-lg md:w-[50ch] text-center w-[35ch] text-(--color-text-muted)">
          Atlas Recon scans WordPress sites for vulnerable core versions,
          plugins, themes, exposed services, and known CVEs enriched with
          Wordfence intelligence.
        </h2>
        <div className="flex gap-2 mt-5">
          <Link to="/auth/signup">
            <Button className="hover:-translate-y-0.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(249,115,22,0.7)]">
              <ScanLineIcon /> Start Scan
            </Button>
          </Link>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onSubmitDemo}
            disabled={loading}
          >
            Start Demo <ArrowRight />{" "}
          </Button>
        </div>
        <div className="border-t mt-8 border-(--color-border-subtle) md:w-[500px] w-[350px]">
          <div className="flex items-center justify-center py-6 px-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="md:text-3xl text-2xl font-bold">
                40<span className="text-primary">K+</span>
              </span>
              <span className="text-[10px] text-(--color-text-muted) uppercase whitespace-nowrap">
                WP Vulns Tracked
              </span>
            </div>
            <span className="border-r h-10 border-(--color-border-subtle)" />
            <div className="flex flex-col items-center">
              <span className="md:text-3xl text-2xl font-bold">
                CVE<span className="text-primary">+</span>
              </span>
              <span className="text-[10px] text-(--color-text-muted) uppercase whitespace-nowrap">
                Wordfence Data
              </span>
            </div>
            <span className="border-r h-10 border-(--color-border-subtle)" />
            <div className="flex flex-col items-center">
              <span className="md:text-3xl text-2xl font-bold">
                {"<5"}
                <span className="text-primary">min</span>
              </span>
              <span className="text-[10px] text-(--color-text-muted) uppercase whitespace-nowrap">
                First Findings
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-t-lg border-x border-t border-border px-1 z-40 pt-1">
          <img
            src="/hero-image.webp"
            alt="Hero image of internal dashboard"
            className="aspect-3/4 max-h-80 w-full rounded-t-lg border border-border object-cover object-top-left md:aspect-video md:max-h-[630px] "
          />
        </div>
      </section>
    </div>
  );
};

export default Hero;
