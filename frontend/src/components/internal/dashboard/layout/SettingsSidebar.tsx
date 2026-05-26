import { Button } from "#/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, LayoutDashboardIcon, PlugIcon } from "lucide-react";

const generalLinks = [
  {
    label: "My Account",
    icon: <LayoutDashboardIcon size={18} />,
    href: "/dashboard/settings/",
  },
];

const configLinks = [
  {
    label: "Integrations",
    icon: <PlugIcon size={18} />,
    href: "/dashboard/settings/integrations",
  },
];

const SettingsSidebar = () => {
  return (
    <aside className="flex flex-col border-r border-border row-span-full bg-card h-screen relative">
      <div className="flex items-center px-4 py-2.5 border-b border-border">
        <Link to="/dashboard">
          <Button variant="ghost">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
      <h4 className="px-4 pt-6 text-(--color-text-muted) uppercase text-[10px] tracking-wide">
        overview
      </h4>
      <div className="flex flex-col gap-1 px-2 pt-2 overflow-y-auto">
        {generalLinks.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            activeOptions={{ exact: true }}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-(--color-text-muted) hover:text-foreground hover:bg-accent"
            activeProps={{
              className:
                "bg-primary/10 border-l border-primary text-primary hover:bg-primary/10 hover:text-primary",
            }}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
      <h4 className="px-4 pt-6 text-(--color-text-muted) uppercase text-[10px] tracking-wide">
        Config
      </h4>
      <div className="flex flex-col gap-1 px-2 pt-2 overflow-y-auto">
        {configLinks.map((link, index) => (
          <Link
            key={index}
            to={link.href}
            activeOptions={{ exact: true }}
            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-(--color-text-muted) hover:text-foreground hover:bg-accent"
            activeProps={{
              className:
                "bg-primary/10 border-l border-primary text-primary hover:bg-primary/10 hover:text-primary",
            }}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SettingsSidebar;
