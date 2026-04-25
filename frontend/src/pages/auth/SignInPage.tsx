import React, {useState} from "react";
import FloatingOrbs from "#/components/FloatingOrbs.tsx";
import {Button} from "#/components/ui/button.tsx";
import { LockIcon, MailIcon} from "lucide-react";
import {Field, FieldGroup, FieldLabel} from "#/components/ui/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupInput} from "#/components/ui/input-group.tsx";
import {Link} from "@tanstack/react-router";
import SecondaryNavbar from "#/components/SecondaryNavbar.tsx";
import toast from 'react-hot-toast'
import {authClient} from "#/lib/auth-client.ts";
import {AppToast} from "#/components/Toasts.tsx";

const SignInPage = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('input-group-email') || '')
    const password = String(formData.get('input-group-password') || '')

    if (!email || !password) return

    try {
       await authClient.signIn.email(
        {
          email,
          password,
          rememberMe: false,
        },
        {
          onRequest: () => {
            console.log('Signing in...')
          },
          onSuccess: () => {},
          onError(context) {
            console.error(
              "There was an error signing in with email.",
              context.error.message
            );

            toast.custom((t) => (
              <AppToast
                t={t}
                variant="error"
                title="Failed To Sign In With Email"
                description="Error occurred during sign-in. Please try again later."
              />
            ));
          }
        },
      )
    } catch (error) {
      console.error("An unexpected error occurred during sign-in:", error);
    }
    setLoading(false)
  }

  const onSubmitGoogle = async () => {
    setLoading(true)
    try {
      await authClient.signIn.social(
        {
          provider: "google",
          callbackURL: "/auth/callback",
          errorCallbackURL: "/auth/signin",
        },
        {
          onRequest() {
            console.log("Signing in with Google...");
          },
          onSuccess() {},
          onError(context) {
            console.error(
              "There was an error signing in with Google.",
              context.error.message
            );

            toast.custom((t) => (
              <AppToast
                t={t}
                variant="error"
                title="Failed To Create Google Sign-In"
                description="Error occurred during Google sign-in. Please try again later."
              />
            ));
          },
        }
      );
    } catch (error) {
      console.error("An unexpected error occurred during Google sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  return  (
    <div className="relative flex items-center justify-center min-h-screen">
      <SecondaryNavbar />
      <FloatingOrbs />
      <section className="container mx-auto flex flex-col items-center space-y-8 justify-center">
        <div className="flex items-center absolute top-90 justify-center bg-primary/20 border border-primary/20  w-90 px-4 py-2"><span className="text-primary uppercase text-xs">Under Development, Use SSO to access Atlas Recon</span></div>
        <div className="relative flex flex-col md:w-95 w-80 md:mx-0 mx-3 mt-20 gap-1 bg-card border border-(--color-border-subtle)">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--brand-secondary)] via-[var(--primary)] to-transparent" />
          <div className="px-6 py-10">
            <h3 className="font-bold text-2xl">Welcome Back</h3>
            <p className="text-sm text-(--color-text-muted)">Sign in to your Atlas Recon dashboard.</p>
          </div>
          <div className="border-b border-(--color-border-subtle) w-full" />
          <form onSubmit={onSubmit}>
            <FieldGroup className="mt-8 flex flex-col px-6">
              <Field>
                <FieldLabel className="text-xs text-(--color-text-muted)" htmlFor="input-group-email">Email</FieldLabel>
                <InputGroup className="bg-secondary">
                  <InputGroupInput className="text-sm md:text-md" id="input-group-email" type="email" required name="input-group-email" placeholder="you@company.com" />
                  <InputGroupAddon align="inline-start">
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <div className="flex justify-between">
                <FieldLabel className="text-xs text-(--color-text-muted)" htmlFor="input-group-password">Password</FieldLabel>
                <Link to="/auth/forgot-password">
                <FieldLabel className="text-xs text-(--color-text-muted) hover:text-primary cursor-pointer">Forgot Password?</FieldLabel>
                </Link>
                </div>
                <InputGroup className="bg-secondary">
                  <InputGroupInput className="text-sm md:text-md" id="input-group-password" type="password" required name="input-group-password" minLength={12} maxLength={64} placeholder="xxxxxxxx" />
                  <InputGroupAddon align="inline-start">
                    <LockIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
            <div className="flex items-center justify-between px-6 py-4">
              <Button className="mt-4 w-full hover:-translate-y-0.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(249,115,22,0.7)]" type="submit">Sign In</Button>
            </div>
            <div className="flex items-center gap-4 max-w-xs mx-auto">
              <div className="flex-1 h-px bg-linear-to-r from-transparent to-border" />
              <span className="text-[10px] tracking-widest uppercase text-(--color-text-muted)">
                or
              </span>
              <div className="flex-1 h-px bg-linear-to-l from-transparent to-border" />
            </div>
            <div className="flex items-center justify-between px-6 py-4">
              <Button
                variant="outline"
                className="w-full transition-all duration-300 mb-2 cursor-pointer"
                onClick={onSubmitGoogle}
                disabled={loading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="size-4"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Login with Google
              </Button>
            </div>
            <div className="border-b border-(--color-border-subtle) w-full" />
            <div className=" py-4 text-center text-sm text-(--color-text-muted)">
              Don&apos;t have an account?{' '}
              <Link to="/auth/signup" className="font-medium text-sm text-primary transition-all duration-300 hover:text-primary/60">
                Start for free
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default SignInPage