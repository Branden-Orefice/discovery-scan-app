import { createFileRoute, redirect } from '@tanstack/react-router'
import SignUpPage from "#/pages/auth/SignUpPage.tsx";
import {authClient} from "#/lib/auth-client.ts";

export const Route = createFileRoute('/auth/signup')({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();
    if (session) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div><SignUpPage /></div>
}
