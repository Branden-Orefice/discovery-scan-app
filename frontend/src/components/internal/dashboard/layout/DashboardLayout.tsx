import DashboardHeader from "#/components/internal/dashboard/layout/DashboardHeader.tsx";
import DashboardSidebar from "#/components/internal/dashboard/layout/DashboardSidebar.tsx";
import {Outlet} from "@tanstack/react-router";

const DashboardLayout = () => {
  return (
    <div className='grid h-screen grid-rows-[auto_1fr] grid-cols-[15rem_1fr]'>
      <DashboardHeader />
      <DashboardSidebar />
      <main className="px-6 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;