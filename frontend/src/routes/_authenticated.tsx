import {createFileRoute, Outlet, useNavigate} from '@tanstack/react-router'
import {AuthProvider, useAuth} from "#/context/AuthContext.tsx";
import {useEffect} from "react";
import AppBootLoader from "#/components/AppBootLoader.tsx";

export const Route = createFileRoute('/_authenticated')({
  component: AuthenticatedLayout,
})

function AuthenticatedLayout() {
  return (
    <AuthProvider>
      <ProtectedRoute />
    </AuthProvider>
  );
}

function ProtectedRoute() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      navigate({ to: "/auth/signin" });
    }
  }, [session, loading, navigate]);

  return (
    <AppBootLoader loading={loading}>
      {session && <Outlet />}
    </AppBootLoader>
  );
}
