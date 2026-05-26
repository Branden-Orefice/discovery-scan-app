import DashboardHeader from "#/components/internal/dashboard/layout/DashboardHeader.tsx";
import DashboardSidebar from "#/components/internal/dashboard/layout/DashboardSidebar.tsx";
import { Outlet, useLocation } from "@tanstack/react-router";

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const isSettings = pathname.startsWith("/dashboard/settings");
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[15rem_1fr]">
      {!isSettings ? (
        <>
          <DashboardHeader />
          <DashboardSidebar />
          <main className="px-4 py-4">
            <Outlet />
          </main>
        </>
      ) : (
        <main className="col-span-2 row-span-2 min-w-0 overflow-hidden">
          <Outlet />
        </main>
      )}
    </div>
  );
};

export default DashboardLayout;
