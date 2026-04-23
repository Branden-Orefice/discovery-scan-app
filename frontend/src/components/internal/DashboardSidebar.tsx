import {
  BellIcon,
  BugIcon,
  CloudIcon,
  LayoutDashboardIcon,
  PlugIcon,
  ScanLineIcon,
  ServerIcon,
  SettingsIcon,
  ClipboardPlusIcon,
  SquareActivityIcon
} from "lucide-react";
import {Link} from "@tanstack/react-router";
import DashboardUser from "#/components/internal/DashboardUser.tsx";


const overviewLinks = [
  { label: 'Dashboard', icon: <LayoutDashboardIcon size={18} />, href: '/dashboard' },
  { label: 'Attack Surface', icon: <SquareActivityIcon size={18} />, href: '/dashboard/attack-surface' },
  { label: 'Vulnerabilities', icon: <BugIcon size={18} />, href: '/dashboard/vulnerabilities' },
  { label: 'Ports & Services', icon: <ServerIcon size={18} />, href: '/dashboard/ports-services' },
  { label: 'Cloud Assets', icon: <CloudIcon size={18} />, href: '/dashboard/cloud-assets' },
];

const monitorLinks = [
  { label: 'Alerts', icon: <BellIcon size={18} />, href: '/dashboard/alerts' },
  { label: 'Scan History', icon: <ScanLineIcon size={18} />, href: '/dashboard/scan-history' },
  { label: 'Reports', icon: <ClipboardPlusIcon size={18} />, href: '/dashboard/reports' },
];

const configLinks = [
  { label: 'Integrations', icon: <PlugIcon size={18} />, href: '/dashboard/integrations' },
  { label: 'Settings', icon: <SettingsIcon size={18} />, href: '/dashboard/settings' },

];

const DashboardSidebar = () => {
  return (
    <aside className="flex flex-col border-r border-border row-span-full bg-card h-screen relative">
      <div className="flex items-center px-4 py-2.25 border-b border-border shrink-0">
        <img src="/logo.png" alt="Dashboard Logo" className="w-6" />
        <h4 className="font-bold">Atlas Recon</h4>
      </div>
        <h4 className="px-4 pt-6 text-(--color-text-muted) uppercase text-[10px] tracking-wide">overview</h4>
      <div className="flex flex-col gap-1 px-2 pt-2 overflow-y-auto">
        {overviewLinks.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            activeOptions={{exact: true}}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-(--color-text-muted) hover:text-foreground hover:bg-accent"
            activeProps={{
              className: "bg-primary/10 border-l border-primary text-primary hover:bg-primary/10 hover:text-primary",
            }}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
      <h4 className="px-4 pt-6 text-(--color-text-muted) uppercase text-[10px] tracking-wide">Monitor</h4>
      <div className="flex flex-col gap-1 px-2 pt-2 overflow-y-auto">
        {monitorLinks.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            activeOptions={{exact: true}}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-(--color-text-muted) hover:text-foreground hover:bg-accent"
            activeProps={{
              className: "bg-primary/10 border-l border-primary text-primary hover:bg-primary/10 hover:text-primary",
            }}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
      <h4 className="px-4 pt-6 text-(--color-text-muted) uppercase text-[10px] tracking-wide">Config</h4>
      <div className="flex flex-col gap-1 px-2 pt-2 overflow-y-auto">
        {configLinks.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            activeOptions={{exact: true}}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-(--color-text-muted) hover:text-foreground hover:bg-accent"
            activeProps={{
              className: "bg-primary/10 border-l border-primary text-primary hover:bg-primary/10 hover:text-primary",
            }}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
      <div className="mt-auto border-t border-border p-4">
        <DashboardUser />
      </div>
    </aside>
  );
};

export default DashboardSidebar;