import React, {useState} from "react";
import SecondaryNavbar from "#/components/SecondaryNavbar.tsx";
import FloatingOrbs from "#/components/FloatingOrbs.tsx";
import {Field, FieldGroup, FieldLabel} from "#/components/ui/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupInput} from "#/components/ui/input-group.tsx";
import {LockIcon, LogInIcon} from "lucide-react";
import {Link, useNavigate} from "@tanstack/react-router";
import {Button} from "#/components/ui/button.tsx";
import {authClient} from "#/lib/auth-client.ts";
import toast from "react-hot-toast";
import {AppToast} from "#/components/Toasts.tsx";

const NewPassword = () => {
  const token = new URLSearchParams(window.location.search).get("token");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordReset, setPasswordReset] = useState(false
  );
  const navigate = useNavigate();

  const handleSendPasswordReset = async (passwordReset: string) => {
    if (!passwordReset) return;

      if (password !== passwordConfirm) {
        toast.custom((t) => (
          <AppToast
            t={t}
            variant="warning"
            title="Passwords Do Not Match"
            description="Please make sure your passwords match."
          />
        ));
        return;
      }

      if (password.length < 12 || password.length > 64) {
        toast.custom((t) => (
          <AppToast
            t={t}
            variant="warning"
            title="Password Length"
            description="Password must be between 12 and 64 characters."
          />
        ));
      }

      if (!token) {
        toast.custom((t) => (
          <AppToast
            t={t}
            variant="error"
            title="Token Missing"
            description="Token is required for password reset. Please try again later."
          />
        ));
      }

    try {
      setLoading(true)

      await authClient.resetPassword({
          newPassword: password,
          token: token ?? undefined
        },
        {
          onRequest() {
            console.log("Sending password reset...");
          },
          onSuccess() {
            setPasswordReset(true);
          },
          onError(context) {
            console.error(
              "There was an error submitting password reset form.",
              context.error.message
            );

            toast.custom((t) => (
              <AppToast
                t={t}
                variant="error"
                title="Failed To Reset Password"
                description="Error occurred resetting password. Please try again later."
              />
            ));
          },
        });
    } catch (error) {
      console.error("An unexpected error occurred resetting password:", error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    await handleSendPasswordReset(password)
  }
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <SecondaryNavbar />
      <FloatingOrbs />
      <section className="container mx-auto flex flex-col items-center space-y-8 justify-center">
        <div className="relative flex flex-col md:w-95 w-80 md:mx-0 mx-3 mt-20 gap-1 bg-card border border-(--color-border-subtle)">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--brand-secondary)] via-[var(--primary)] to-transparent" />
          {!passwordReset ? (
            <>
              <div className="px-6 py-10">
                <h3 className="font-bold text-2xl mb-2">Create new password</h3>
                <p className="text-sm text-(--color-text-muted)">Choose a strong password to protect your account.</p>
              </div>
              <div className="border-b border-(--color-border-subtle) w-full" />
              <form onSubmit={onSubmit}>
                <FieldGroup className="mt-8 flex flex-col px-6">
                  <Field>
                    <FieldLabel className="text-xs text-(--color-text-muted)" htmlFor="input-group-password">New Password</FieldLabel>
                    <InputGroup className="bg-secondary">
                      <InputGroupInput
                        className="text-sm md:text-md"
                        id="input-group-password"
                        type="password"
                        required
                        minLength={12}
                        maxLength={64}
                        name="input-group-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 12 characters"
                      />
                      <InputGroupAddon align="inline-start">
                        <LockIcon />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                  <Field>
                    <FieldLabel className="text-xs text-(--color-text-muted)" htmlFor="input-group-confirm-password">Confirm New Password</FieldLabel>
                    <InputGroup className="bg-secondary">
                      <InputGroupInput
                        className="text-sm md:text-md"
                        id="input-group-confirm-password"
                        type="password"
                        required
                        minLength={12}
                        maxLength={64}
                        name="input-group-confirm-password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        placeholder="Repeat your password"
                      />
                      <InputGroupAddon align="inline-start">
                        <LockIcon />
                      </InputGroupAddon>
                    </InputGroup>
                  </Field>
                </FieldGroup>

                <div className="flex items-center justify-between px-6 py-4">
                  <Button className="mt-4 w-full hover:-translate-y-0.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(249,115,22,0.7)]" type="submit" disabled={loading}>Set New Password</Button>
                </div>
                <div className="border-b border-(--color-border-subtle) w-full" />
                <div className=" py-4 text-center text-sm text-(--color-text-muted)">
                  Remember your password?{" "}
                  <Link to="/auth/signin" className="font-medium text-sm text-primary transition-all duration-300 hover:text-primary/60">
                    Sign in
                  </Link>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="px-6 py-10 flex flex-col items-center justify-center text-center">
                <h3 className="font-bold text-2xl mb-2">Password <span className="text-primary">reset</span></h3>
                <p className="text-sm text-(--color-text-muted)">Your new password is active. You can now sign in to your Atlas Recon dashboard.</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 py-6 border-y border-(--color-border-subtle) bg-secondary/30">
                <div className="text-sm text-center text-(--color-text-muted)">
                  <p>Password changed {Date()}. If this wasn't you, <Link to="/contact" className="text-(--brand-secondary)">contact support immediately.</Link></p>
                </div>
              </div>

              <div className="px-6 py-4">
                <Button
                  className="mt-4 w-full hover:-translate-y-0.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(249,115,22,0.7)]"
                  disabled={loading}
                  onClick={() => navigate({to: '/auth/signin'})}
                >
                  <LogInIcon className="mr-2" size={16} />
                  Sign In to Dashboard
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default NewPassword;