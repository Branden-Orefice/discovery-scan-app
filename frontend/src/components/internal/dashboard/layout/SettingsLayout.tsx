import { Outlet } from "@tanstack/react-router";
import SettingsHeader from "./SettingsHeader";
import SettingsSidebar from "./SettingsSidebar";

const SettingsLayout = () => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr] grid-cols-[15rem_1fr]">
      <SettingsHeader />
      <SettingsSidebar />
      <main className="px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
};

export default SettingsLayout;
