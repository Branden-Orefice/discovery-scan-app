import { createFileRoute } from '@tanstack/react-router'
import NewPassword from "#/pages/auth/NewPassword.tsx";

export const Route = createFileRoute('/auth/new-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><NewPassword /></div>
}
