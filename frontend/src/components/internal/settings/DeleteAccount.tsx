import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
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
import { Button } from "#/components/ui/button";
import { Label } from "#/components/ui/label";
import { Input } from "#/components/ui/input";
import { AppToast } from "#/components/Toasts";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password") || "");

    if (!password) {
      toast.custom((t) => (
        <AppToast
          t={t}
          variant="error"
          title="Failed To Delete Account"
          description="Password is required to delete account."
        />
      ));
      return;
    }

    try {
      setLoading(true);
      const { error } = await authClient.deleteUser({
        password,
        callbackURL: "/auth/goodbye",
      });
      if (error) {
        toast.custom((t) => (
          <AppToast
            t={t}
            variant="error"
            title="Failed To Delete Account"
            description="Error occurred while deleting account. Please try again later."
          />
        ));
      } else {
        toast.custom((t) => (
          <AppToast
            t={t}
            variant="success"
            title="Account Deleted Successfully"
            description="Your account has been successfully deleted."
          />
        ));
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
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
              className="text-destructive hover:text-destructive/90 cursor-pointer"
            >
              Delete
            </Button>
          }
        />
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This action will be permanent! Enter your password to delete your
              account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                minLength={12}
                maxLength={64}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" className="cursor-pointer" disabled={loading}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default DeleteAccount;
