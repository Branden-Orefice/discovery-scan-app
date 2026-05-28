import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "#/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { authClient } from "@/lib/auth-client";

const SetPassword = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPassword = String(formData.get("newPassword") || "");
    const currentPassword = String(formData.get("currentPassword") || "");

    if (!newPassword || !currentPassword) {
      toast.error("Please fill out both fields.");
      return;
    }

    if (newPassword.length < 12 || newPassword.length > 64) {
      toast.error("Password must be between 12 and 64 characters.");
      return;
    }

    try {
      setLoading(true);
      const { error } = await authClient.changePassword({
        newPassword: newPassword,
        currentPassword: currentPassword,
        revokeOtherSessions: true,
      });
      if (error) {
        toast.error("There was an unexpected error changing password");
      } else {
        toast.success("Password was successfully changed.");
      }
    } catch (error) {
      console.error("Failed to change password:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <form onSubmit={onSubmit}>
        <DialogTrigger
          render={
            <Button
              variant="outline"
              className="cursor-pointer text-muted-foreground hover:text-muted-foreground/90"
            >
              Set Password
            </Button>
          }
        />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set New Password</DialogTitle>
            <DialogDescription>
              Setting a new password will sign you out. You'll need to sign in
              afterwards.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="currentPassword">Current password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="text"
                minLength={12}
                maxLength={64}
                placeholder="Current"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="text"
                minLength={12}
                maxLength={64}
                placeholder="New"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" className="cursor-pointer" disabled={loading}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default SetPassword;
