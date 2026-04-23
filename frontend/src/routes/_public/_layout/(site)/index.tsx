import { createFileRoute } from '@tanstack/react-router'
import Hero from "@/components/external/Hero.tsx";
import HowItWorks from "@/components/external/HowItWorks.tsx";
import Features from "@/components/external/Features.tsx";
import FAQ from "@/components/external/FAQ.tsx";

export const Route = createFileRoute('/_public/_layout/(site)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <FAQ />
    </>
  )
}
