import { createFileRoute } from '@tanstack/react-router'
import CloudAssetsPage from "#/pages/internal/CloudAssetsPage.tsx";

export const Route = createFileRoute('/_authenticated/dashboard/cloud-assets')({
  component: RouteComponent,
  staticData: {title: "Cloud Assets"}
})

function RouteComponent() {
  return <div><CloudAssetsPage /></div>
}
