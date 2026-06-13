import Goodbye from "#/pages/misc/Goodbye";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/goodbye")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Goodbye />
    </div>
  );
}
