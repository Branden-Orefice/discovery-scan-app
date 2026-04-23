import { createFileRoute } from '@tanstack/react-router'
import SignInPage from "#/pages/auth/SignInPage.tsx";

export const Route = createFileRoute("/auth/signin")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><SignInPage /></div>
}
