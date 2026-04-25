import { createFileRoute } from '@tanstack/react-router'
import EmailVerification from "#/pages/auth/EmailVerification.tsx";

export const Route = createFileRoute('/auth/email-verification')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><EmailVerification /></div>
}
