import {useEffect} from "react";
import {createFileRoute, useNavigate} from '@tanstack/react-router'
import {authClient} from "#/lib/auth-client.ts";
import toast from "react-hot-toast";
import {AppToast} from "#/components/Toasts.tsx";


export const Route = createFileRoute('/auth/callback')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const {data: session, isPending} = authClient.useSession()

  useEffect(() => {
    if (isPending) return;

    if (!session) {
      navigate({to: '/auth/signin'})
      return
    }
    if (session) {
      setTimeout(() => {
        toast.custom((t) => (
          <AppToast
            t={t}
            variant="success"
            title="Successfully Signed In"
            description={`Welcome back, ${session?.user.name}`}
          />
        ))
      }, 5000)
      navigate({to: '/dashboard'})
    }
  }, [session, isPending, navigate]);
  return null;
}
