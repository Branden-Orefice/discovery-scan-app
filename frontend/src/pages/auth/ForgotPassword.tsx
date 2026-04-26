import React, {useState} from "react";
import SecondaryNavbar from "#/components/SecondaryNavbar.tsx";
import FloatingOrbs from "#/components/FloatingOrbs.tsx";
import {Field, FieldGroup, FieldLabel} from "#/components/ui/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupInput} from "#/components/ui/input-group.tsx";
import {ChevronLeftIcon, CircleAlertIcon, LockIcon, MailIcon, RotateCcwIcon} from "lucide-react";
import {Link} from "@tanstack/react-router";
import {Button} from "#/components/ui/button.tsx";
import {authClient} from "#/lib/auth-client.ts";
import toast from "react-hot-toast";
import {AppToast} from "#/components/Toasts.tsx";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSendResetLink = async (emailToReset: string) => {
    if (!emailToReset) return;

    try {
      setLoading(true)
      await authClient.requestPasswordReset({
        email: emailToReset,
        redirectTo: `${import.meta.env.VITE_FRONTEND_URI}/auth/new-password`,
      },
        {
          onRequest() {
            console.log("Sending reset link...");
          },
          onSuccess() {
            setEmailSent(true);
          },
          onError(context) {
            console.error(
              "There was an error sending reset link to email.",
              context.error.message
            );

            toast.custom((t) => (
              <AppToast
                t={t}
                variant="error"
                title="Failed To Send Reset Link To Email"
                description="Error occurred sending reset link. Please try again later."
              />
            ));
          },
      });
    } catch (error) {
      console.error("An unexpected error occurred sending reset link:", error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleSendResetLink(email)
  }
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <SecondaryNavbar />
      <FloatingOrbs />
      <section className="container mx-auto flex flex-col items-center space-y-8 justify-center">
        <div className="relative flex flex-col md:w-95 w-80 md:mx-0 mx-3 mt-20 gap-1 bg-card border border-(--color-border-subtle)">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--brand-secondary)] via-[var(--primary)] to-transparent" />
          {!emailSent ? (
            <>
              <div className="px-6 py-10">
                <h3 className="font-bold text-2xl mb-2">Forgot your password?</h3>
                <p className="text-sm text-(--color-text-muted)">No problem. Enter your email and we'll send a secure reset link.</p>
              </div>
              <div className="border-b border-(--color-border-subtle) w-full" />
              <form onSubmit={onSubmit}>
                <FieldGroup className="mt-8 flex flex-col px-6">
                  <Field>
                    <FieldLabel className="text-xs text-(--color-text-muted)" htmlFor="input-group-email">Email</FieldLabel>
                    <InputGroup className="bg-secondary">
                      <InputGroupInput
                        className="text-sm md:text-md"
                        id="input-group-email"
                        type="email"
                        required
                        name="input-group-email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                      />
                      <InputGroupAddon align="inline-start">
                        <MailIcon />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </FieldGroup>
                <div className="flex items-center justify-between px-6 py-4">
                  <Button className="mt-4 w-full hover:-translate-y-0.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(249,115,22,0.7)]" type="submit" disabled={loading}>Send Reset Link</Button>
                </div>
                <div className="max-w-xs mx-auto">
                  <span className="text-[10px] mb-8 flex items-center justify-center gap-2 tracking-widest uppercase text-(--color-text-muted)">
                    <LockIcon size={12} />
                    Reset links expire after 15 minutes
                  </span>
                </div>
                <div className="border-b border-(--color-border-subtle) w-full" />
                <div className=" py-4 text-center text-sm text-(--color-text-muted)">
                  Remember it after all?{" "}
                  <Link to="/auth/signin" className="font-medium text-sm text-primary transition-all duration-300 hover:text-primary/60">
                    Sign in
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="px-6 py-10 flex flex-col items-center justify-center text-center">
                <h3 className="font-bold text-2xl mb-2">Check your <span className="text-primary">inbox</span></h3>
                <p className="text-sm text-(--color-text-muted)">We sent a password reset link to <strong className="text-foreground">{email}</strong>. It may take a minute to arrive.</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 py-6 border-y border-(--color-border-subtle) bg-secondary/30">
                <div className="p-3 rounded-full bg-secondary border border-(--color-border-subtle)">
                  <MailIcon size={24} className="text-primary" />
                </div>
                <div className="text-center">
                  <strong className="text-foreground text-sm block">{email}</strong>
                  <span className="text-xs text-(--color-text-muted)">
                    Check your spam folder if it doesn't arrive
                  </span>
                </div>
              </div>

              <div className="px-6 py-4">
                <span className="flex mx-auto items-center justify-center border border-(--color-border) w-full bg-secondary py-2 text-[10px] gap-2 tracking-widest uppercase text-(--color-text-muted)">
                  <CircleAlertIcon size={12} />
                  Link expires in 15 minutes
                </span>
                <Button
                  variant="outline"
                  className="mt-4 w-full hover:-translate-y-0.5 cursor-pointer transition-all duration-300"
                  disabled={loading}
                  onClick={() => handleSendResetLink(email)}
                >
                  <RotateCcwIcon className="mr-2" size={16} />
                  Resend email
                </Button>
              </div>
              <div className="border-t border-(--color-border-subtle) w-full" />
              <div className="py-6 text-center text-sm text-(--color-text-muted)">
                <Link to="/auth/signin" className="font-medium inline-flex items-center justify-center text-sm transition-all duration-300 hover:text-foreground">
                  <ChevronLeftIcon size={16} className="mr-1" />
                  Back to sign in
                </Link>
              </div>
            </>
          )}
          </div>
        </section>
      </div>
    )
  }

export default ForgotPassword;