import { createFileRoute } from '@tanstack/react-router'
import Contact from "@/components/external/Contact.tsx";

export const Route = createFileRoute('/_public/_layout/(site)/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div><Contact /></div>
}
