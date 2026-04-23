import React from 'react'
import {Button} from "@/components/ui/button.tsx";
import { Rocket } from "lucide-react";
import {Link} from "@tanstack/react-router";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col w-full">
      <section id="features" className="container mx-auto md:px-0 px-3">
        <div className="space-y-2 mt-20 relative border border-(--color-border-subtle) py-16 px-8">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--brand-secondary)] via-[var(--primary)] to-transparent" />
          <h3 className="md:text-3xl text-2xl font-bold text-left">
            Ready to see your exposure?
          </h3>
          <p className="md:text-sm text-xs text-(--color-text-muted) md:w-[80ch] w-[40ch]">
            Start your free scan in under 60 seconds - no credit card required.
          </p>
          <div className="absolute right-6 top-20">
            <Link to="/auth/signup">
              <Button className="hidden md:block hover:-translate-y-0.5 cursor-pointer transition-all duration-300">Start Free Scan</Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full border-t border-(--color-border-subtle) mt-20">
        <footer className="container mx-auto flex items-center justify-between py-8">

          <div className="flex items-center md:px-0 pl-3">
            <img className="w-auto h-12" src="/logo.png" alt="App Logo" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-8 md:text-sm text-xs text-(--color-text-muted)">
              <a href="/privacy" className="transition-colors duration-300 hover:text-(--color-text-primary)">
                Privacy
              </a>
              <a href="/terms" className="transition-colors duration-300 hover:text-(--color-text-primary)">
                Terms
              </a>
              <a href="/contact" className="transition-colors duration-300 hover:text-(--color-text-primary)">
                Contact
              </a>
            </div>
            <span className="md:text-xs text-[10px] text-(--color-text-muted)">~ Built with React, Tailwind, and TypeScript ~</span>
          </div>

          <div className="flex items-center md:px-0 pr-3">
            <button
              onClick={scrollToTop}
              className="p-2 transition-all duration-300 hover:text-(--color-text-primary) text-(--color-text-muted) hover:-translate-y-1"
              aria-label="Scroll to top"
            >
              <Rocket className="w-6 h-6" />
            </button>
          </div>
        </footer>
        <div className="w-full border-t border-(--color-border-subtle)" />
      </div>
    </div>
  );
};

export default Footer;
