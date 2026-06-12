import * as React from "react";
import toast from "react-hot-toast";
import {
  BadgeCheck,
  User,
  Mail,
  Lock,
  Shield,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
import { Badge } from "#/components/ui/badge";
import { Separator } from "#/components/ui/separator";
import { Button } from "#/components/ui/button";
import DeleteAccount from "#/components/internal/settings/DeleteAccount";
import { Card, CardContent, CardHeader } from "#/components/ui/card";
import SetPassword from "#/components/internal/settings/SetPassword";
import SessionManagement from "#/components/internal/settings/SessionManagment";
import displayUserImage from "#/utils/displayUserImage.tsx";

const SettingsPage = () => {
  const [loading, setLoading] = React.useState(false);
  const { session } = useAuth();

  const email = session?.user.email ?? "—";
  const emailVerified = session?.user.emailVerified as
    | boolean
    ;

  const sessions = session ? [session.session] : [];

  const currentSessionToken = session?.session.token ?? "";

  const verifyEmail = async () => {
    if (!email || email === "-") {
      toast.error("No email on file.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await authClient.sendVerificationEmail(
        {
          email,
          callbackURL: `/settings/account`,
        },
        {
          onSuccess() {
            toast.success("Email verification sent!");
          },
          onError() {
            toast.error("Failed to send verification email.");
          },
        },
      );
      if (error) {
        console.error("Failed to send verification email in account page.");
      }
    } catch (error) {
      console.error(
        "There was an error sending verification email in account:",
        error,
      );
    } finally {
      setLoading(false);
    }
  };

  const accountCreated = session?.user?.createdAt?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const lastLogin = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const activeSessions = sessions.length;

  return (
    <div className="w-full max-w-[1600px] mx-auto space-y-6">
      {session?.user.name === "Demo User" ?
        <div className="space-y-6">
        <h1 className="text-2xl font-bold mb-1">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile, security, and account preferences
        </p>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="size-20 shrink-0">
                {displayUserImage()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-bold">{session?.user.name}</h2>
                  {emailVerified && (
                    <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
                      <BadgeCheck className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                  <Mail className="h-3.5 w-3.5" />
                   demo@gmail.com
                </div>

                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="rounded-lg bg-muted/10 px-3 py-2">
                    <div className="text-xs text-muted-foreground">
                      Account Created
                    </div>
                    <div className="text-sm font-semibold mt-0.5">
                      {accountCreated}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/10 px-3 py-2">
                    <div className="text-xs text-muted-foreground">
                      Last Login
                    </div>
                    <div className="text-sm font-semibold mt-0.5">
                      {lastLogin}
                    </div>
                  </div>
                  <div className="rounded-lg bg-muted/10 px-3 py-2">
                    <div className="text-xs text-muted-foreground">
                      Active Sessions
                    </div>
                    <div className="text-sm font-semibold mt-0.5">
                      {activeSessions}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> : (
      <>
      <div>
        <h1 className="text-2xl font-bold mb-1">Account Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile, security, and account preferences
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="size-20 shrink-0">
              {displayUserImage()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold">{session?.user.name}</h2>
                {emailVerified && (
                  <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
                    <BadgeCheck className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                <Mail className="h-3.5 w-3.5" />
                {session?.user.email}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="rounded-lg bg-muted/10 px-3 py-2">
                  <div className="text-xs text-muted-foreground">
                    Account Created
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {accountCreated}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/10 px-3 py-2">
                  <div className="text-xs text-muted-foreground">
                    Last Login
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {lastLogin}
                  </div>
                </div>
                <div className="rounded-lg bg-muted/10 px-3 py-2">
                  <div className="text-xs text-muted-foreground">
                    Active Sessions
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    {activeSessions}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-border bg-muted/10">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Account Information</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Username</span>
                <span className="text-sm font-medium">
                  @{session?.user.name}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Email</span>
                <span className="text-sm font-medium">
                  {session?.user.email}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Password</span>
                <SetPassword />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b border-border bg-muted/10">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <h3 className="text-sm font-semibold">Security</h3>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-sm font-medium">Email Verification</div>
                  <div className="text-xs text-muted-foreground">
                    Confirm your email address
                  </div>
                </div>
                <div className="text-sm">
                  {typeof emailVerified === "boolean" ? (
                    emailVerified ? (
                      <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30">
                        <BadgeCheck className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={loading}
                        onClick={verifyEmail}
                      >
                        {loading ? "Sending..." : "Verify"}
                      </Button>
                    )
                  ) : (
                    <span className="text-muted-foreground">
                      {emailVerified ?? "—"}
                    </span>
                  )}
                </div>
              </div>
              <Separator />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="border-b border-border bg-muted/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Active Sessions</h3>
                </div>
                <Badge variant="outline" className="text-[10px]">
                  {activeSessions} active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <SessionManagement
                sessions={sessions}
                currentSessionToken={currentSessionToken}
              />
            </CardContent>
          </Card>

          <Card className="border-destructive/30">
            <CardHeader className="rounded-t-xl border-b border-destructive/30">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-destructive" />
                <h3 className="text-sm font-semibold text-destructive">
                  Danger Zone
                </h3>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium mb-1">Delete Account</div>
                  <div className="text-xs text-muted-foreground">
                    Permanently delete your account and all data. This action
                    cannot be undone.
                  </div>
                </div>
                <DeleteAccount />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default SettingsPage;
