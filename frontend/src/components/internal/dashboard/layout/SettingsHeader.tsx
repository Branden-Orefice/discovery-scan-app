import { Button } from "#/components/ui/button";
import { BellIcon } from "lucide-react";

const SettingsHeader = () => {
  return (
    <header className="w-full px-6 py-2.5 border-b border-border">
      <div className="flex items-center justify-end max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-secondary transition-all duration-300 cursor-pointer"
          >
            <BellIcon />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default SettingsHeader;
