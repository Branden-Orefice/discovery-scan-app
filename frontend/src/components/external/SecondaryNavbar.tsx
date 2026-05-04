import {Link} from "@tanstack/react-router";
import {Button} from "#/components/ui/button.tsx";
import {ChevronLeftIcon} from "lucide-react";


const SecondaryNavbar = () => {

  return (
    <header className="fixed top-0 left-0 right-0 z-10 border-b border-(--color-border-subtle)">
      <nav className="container mx-auto flex items-center px-6 py-1 justify-between">
        <div className="flex items-center">
          <Link to="/">
            <img className="w-auto h-16 pt-2" src="/logo.png" alt="App Logo" />
          </Link>
          <span className="font-bold">Atlas Recon</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link to="/">
            <Button variant="ghost" className="text-(--color-text-muted) cursor-pointer transition-all duration-300"><ChevronLeftIcon />Back to home</Button>
          </Link>
        </div>
      </nav>

    </header>
  );
};

export default SecondaryNavbar