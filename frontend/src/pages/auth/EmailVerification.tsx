import SecondaryNavbar from "#/components/external/SecondaryNavbar.tsx";
import FloatingOrbs from "#/components/FloatingOrbs.tsx";
import {LayoutDashboardIcon} from "lucide-react";
import {useNavigate} from "@tanstack/react-router";
import {Button} from "#/components/ui/button.tsx";


const EmailVerification = () => {
  const navigate = useNavigate();


  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <SecondaryNavbar />
      <FloatingOrbs />
      <section className="container mx-auto flex flex-col items-center space-y-8 justify-center">
        <div className="relative flex flex-col md:w-95 w-80 md:mx-0 mx-3 mt-20 gap-1 bg-card border border-(--color-border-subtle)">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--brand-secondary)] via-[var(--primary)] to-transparent" />
              <div className="px-6 py-10 flex flex-col items-center justify-center text-center">
                <h3 className="font-bold text-2xl mb-2">Email <span className="text-primary">Confirmed</span></h3>
                <p className="text-sm text-(--color-text-muted)">Your account is active and ready to go.</p>
              </div>
              
              <div className="flex flex-col items-center justify-center gap-2 py-6 border-y border-(--color-border-subtle) bg-secondary/30">
                <div className="text-sm text-center text-(--color-text-muted) px-6">
                  <p>Welcome to Atlas Recon! You now have full access to your dashboard and scanning tools.</p>
                </div>
              </div>

              <div className="px-6 py-8">
                <Button 
                  className="w-full hover:-translate-y-0.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(249,115,22,0.7)]"
                  onClick={() => navigate({ to: "/auth/signin" })}
                >
                  <LayoutDashboardIcon className="mr-2 w-4 h-4" />
                  Sign In To Access
                </Button>
              </div>
        </div>
      </section>
    </div>
  )
}

export default EmailVerification;
