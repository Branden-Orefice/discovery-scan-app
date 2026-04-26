import { createFileRoute, redirect } from '@tanstack/react-router'
import SignInPage from "#/pages/auth/SignInPage.tsx";
import {authClient} from "#/lib/auth-client.ts";

export const Route = createFileRoute("/auth/signin")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (session) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div><SignInPage /></div>
}
