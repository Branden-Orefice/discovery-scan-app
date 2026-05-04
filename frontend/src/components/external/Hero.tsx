import {Button} from "#/components/ui/button.tsx";
import {ArrowRight, ScanLineIcon} from "lucide-react";
import FloatingOrbs from "@/components/FloatingOrbs.tsx";
import {Link} from "@tanstack/react-router";

const Hero = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
        <FloatingOrbs />
        <section className="container mx-auto flex flex-col items-center space-y-8 justify-center">
            <h1 className="md:text-6xl font-bold items-center flex flex-col text-4xl">Map Your<br/>
            <span className="text-primary">attack surface<br /></span>
            before they do
            </h1>
          <h2 className="md:text-lg md:w-[50ch] w-[35ch] text-(--color-text-muted)">Atlas Recon automatically discovers every exposed asset in your organization, domains, IPs, cloud services - in real time.</h2>
          <div className="flex gap-2 mt-5">
            <Link to="/auth/signup">
            <Button className="hover:-translate-y-0.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(249,115,22,0.7)]"><ScanLineIcon /> Start Scan</Button>
            </Link>
            <Button variant="outline"  className="cursor-pointer">Watch Demo <ArrowRight /> </Button>
          </div>
          <div className="border-t mt-8 border-(--color-border-subtle) md:w-[500px] w-[350px]">
            <div className="flex items-center justify-center py-6 px-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="md:text-3xl text-2xl font-bold">2.5<span className="text-primary">M+</span></span>
              <span className="text-[10px] text-(--color-text-muted) uppercase whitespace-nowrap">Assets Scanned</span>
            </div>
              <span className="border-r h-10 border-(--color-border-subtle)"/>
            <div className="flex flex-col items-center">
              <span className="md:text-3xl text-2xl font-bold">98<span className="text-primary">%</span></span>
            <span className="text-[10px] text-(--color-text-muted) uppercase whitespace-nowrap">Discover Rate</span>
            </div>
              <span className="border-r h-10 border-(--color-border-subtle)"/>
            <div className="flex flex-col items-center">
              <span className="md:text-3xl text-2xl font-bold">{"<5"}<span className="text-primary">min</span></span>
            <span className="text-[10px] text-(--color-text-muted) uppercase whitespace-nowrap">First Results</span>
            </div>
          </div>
          </div>
        </section>
    </div>
  );
};

export default Hero;
