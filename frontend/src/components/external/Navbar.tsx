import {useEffect, useState} from "react";
import {Button} from "#/components/ui/button.tsx";
import { Link } from "@tanstack/react-router";
import {Menu, X} from "lucide-react";

const navLinks = [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Features", href: "/#features"},
    { label: "Faq", href: "/#faq"}
]

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    } else {
      setIsMobileMenuOpen(true)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 border-b border-(--color-border-subtle) transition-all duration-300 ${isScrolled ? "bg-base" : ""}`}>
      <nav className="container mx-auto flex items-center px-6 py-1 justify-between">
          <div className="flex items-center">
        <Link to="/">
          <img className="w-auto h-16 pt-2" src="/logo.png" alt="App Logo" />
        </Link>
            <span className="font-bold">Atlas Recon</span>
      </div>
        <div className="flex-1 justify-center items-center gap-4 hidden md:flex">
          {navLinks.map((link) => (
              <a className="text-(--color-text-muted) hover:text-(--color-text-primary)" key={link.href} href={link.href}>{link.label}</a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth/signin">
            <Button variant="outline" className="hidden md:block">Sign In</Button>
          </Link>
          <Link to="/auth/signup">
            <Button className="hidden md:block hover:-translate-y-0.5 cursor-pointer transition-all duration-300">Start Free Scan</Button>
          </Link>

          <button
            className="md:hidden p-2"
            onClick={handleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="cursor-pointer" size={24} />
            ) : (
              <Menu className="cursor-pointer" size={24} />
            )}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-base/90">
          <div className="container mx-auto px-6 py-6 flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <a
                className="text-(--color-text-muted) hover:text-foreground py-2"
                key={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                href={link.href}
              >

                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-2">
              <Link to="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant='outline'>Sign In</Button>
              </Link>
              <Link to="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                <Button>Start Scan</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
