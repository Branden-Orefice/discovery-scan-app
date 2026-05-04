import {InputGroup, InputGroupAddon, InputGroupInput} from "#/components/ui/input-group.tsx";
import {BellIcon, Search} from "lucide-react";
import {Button} from "#/components/ui/button.tsx";
import {useMatches} from "@tanstack/react-router";


const DashboardHeader = () => {
  const matches = useMatches()
  const title = matches.at(-1)?.staticData?.title;
  return (
    <header className="px-6 py-2.5 border-b border-border">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">{title}</h1>
        <div className="flex items-center gap-4">
          <InputGroup className="bg-secondary w-[250px]">
            <InputGroupInput className="text-sm" id="input-group-search" placeholder="Search assets, CVEs, hosts..." />
            <InputGroupAddon align="inline-start">
              <Search />
            </InputGroupAddon>
          </InputGroup>
          <Button variant="outline" size="icon" className="bg-secondary transition-all duration-300 cursor-pointer"><BellIcon /></Button>
          <Button size="sm" className="hover:-translate-y-0.5 cursor-pointer">New Scan</Button>
        </div>
      </div>

    </header>
  );
};

export default DashboardHeader;