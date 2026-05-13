import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "#/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "#/components/ui/field";
import { Separator } from "#/components/ui/separator";
import { Input } from "#/components/ui/input";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Label } from "#/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  OctagonPauseIcon,
} from "lucide-react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const newScanModalSteps = [
  {
    id: 1,
    step: "01",
    title: "Target",
  },
  {
    id: 2,
    step: "02",
    title: "Scan Type",
  },
  {
    id: 3,
    step: "03",
    title: "Modules",
  },
  {
    id: 4,
    step: "04",
    title: "Schedule",
  },
  {
    id: 5,
    step: "05",
    title: "Review",
  },
];

const newScanModalScanTypes = [
  {
    id: "passive",
    title: "Passive",
    description: "Version + Plugin Detection Only",
    default: true,
  },
  {
    id: "aggressive",
    title: "Aggressive",
    description: "Full WPScan + Brute-Force Checks",
    default: false,
  },
  {
    id: "targeted",
    title: "Targeted",
    description: "Custom WPScan Enumeration",
    default: false,
  },
];

const newScanModalModules = [
  {
    id: "wp-module-1",
    title: "WP Core Detection",
    description: "Version, Theme, Configuration",
    checked: true,
  },
  {
    id: "wp-module-2",
    title: "Plugin Detection",
    description: "Passive + Active Detection",
    checked: true,
  },
  {
    id: "wp-module-3",
    title: "Theme Detection",
    description: "Active + Installed Themes",
    checked: true,
  },
  {
    id: "wp-module-4",
    title: "Vulnerability Lookup",
    description: "Match Against WPScan CVE DB",
    checked: true,
  },
  {
    id: "wp-module-5",
    title: "User Enumeration",
    description: "Discover WP users",
    checked: true,
  },
  {
    id: "wp-module-6",
    title: "Configuration Detection",
    description: "wp-config.php...etc",
    checked: true,
  },
  {
    id: "wp-module-7",
    title: "Login Brute-Force",
    description: "Test WP Login Credentials",
    checked: false,
  },
  {
    id: "wp-module-8",
    title: "XML-RPC Probe",
    description: "Test XML-RPC file detection",
    checked: false,
  },
];

const newScanModalSchedules = [
  {
    id: "run-now",
    title: "Run Now",
    description: "Start immediately after the launch",
    default: true,
  },
  {
    id: "schedule",
    title: "Schedule",
    description: "Pick a specific date and time",
    default: false,
  },
  {
    id: "recurring",
    title: "Recurring",
    description: "Repeat on a schedule",
    default: false,
  },
];

const newScanModalScheduleFrequencies = [
  { label: "Daily", value: "daily" },
  { label: "Every 3 Days", value: "every-three-days" },
  { label: "Weekly", value: "weekly" },
  { label: "Bi-Weekly", value: "bi-weekly" },
  { label: "Monthly", value: "monthly" },
];

const NewScanModal = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [target, setTarget] = useState("");
  const [time, setTime] = useState("10:30:00");
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(
    null,
  );
  const [emailAlert, setEmailAlert] = useState(false);
  const [slackAlert, setSlackAlert] = useState(false);
  const [scanLabel, setScanLabel] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedScanType, setSelectedScanType] = useState("passive");
  const [selectedSchedule, setSelectedSchedule] = useState("run-now");
  const [modalModules, setModalModules] = useState(
    structuredClone(newScanModalModules),
  );

  const showMiddleSteps =
    activeStep === 2 || activeStep === 3 || activeStep === 4;

  const checkedModules = modalModules.filter((module: any) => module.checked);

  const checkedAlerts = [
    ...(emailAlert ? ["email"] : []),
    ...(slackAlert ? ["slack"] : []),
  ];

  const handleNextStep = () => {
    setActiveStep((previous) => previous + 1);
  };

  const handleBackStep = () => {
    setActiveStep((previous) => previous - 1);
  };

  const handleModuleCheckboxChange = (id: string, checked: boolean) => {
    const updateModules = modalModules.map((module: any) => {
      if (module.id === id) {
        module.checked = checked;
      }
      return module;
    });
    setModalModules(updateModules);
  };

  const handleSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();

    try {
      setLoading(true);

      const payload = {
        target,
        scanType: selectedScanType,
        scanLabel,
        schedule: selectedSchedule,
        modules: checkedModules,
        alerts: checkedAlerts,
      };

      console.log("Submitting scan with payload:", payload);

      const sendScanPayload = await fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const scanPayloadResponse = await sendScanPayload.json();

      console.log("Scan launched successfully:", scanPayloadResponse);
    } catch (error) {
      console.error("There was an issue launching the scan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button>New Scan</Button>} />
      <DialogContent className="md:max-w-[550px] md:max-h-[600px]">
        <form onSubmit={handleSubmit}>
          <div className="gradient-border-transparent absolute left-0 top-0 h-[2px] w-full" />
          <DialogTitle className="text-lg font-bold">New Scan</DialogTitle>
          <DialogDescription className="text-sm text-(--color-text-muted)">
            Configure and launch a new scan.
          </DialogDescription>
          <Separator
            orientation="horizontal"
            className="h-px mt-4 bg-border -mx-4"
          />
          <div className="flex justify-evenly py-4 bg-card -mx-4">
            {newScanModalSteps.map((step) => (
              <div key={step.id} className="">
                {activeStep === step.id ? (
                  <>
                    <span className="border rounded-4xl border-primary/50 px-1.5 py-1 bg-primary/10 text-primary text-xs">
                      {step.step}
                    </span>
                    <span className="text-xs ml-2">{step.title}</span>
                  </>
                ) : (
                  <>
                    <span className="border rounded-4xl border-border bg-muted px-1.5 py-1 text-(--color-text-muted) text-xs">
                      {step.step}
                    </span>
                    <span className="text-xs ml-2 text-(--color-text-muted)">
                      {step.title}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
          <Separator
            orientation="horizontal"
            className="h-px bg-border -mx-4"
          />
          {activeStep === 1 && (
            <FieldGroup>
              <>
                <Field className="mt-4">
                  <FieldLabel
                    htmlFor="wordpress-url"
                    className="text-sm text-(--color-text-muted)"
                  >
                    WordPress Site Url
                  </FieldLabel>
                  <Input
                    id="wordpress-url"
                    type="text"
                    required
                    placeholder="https://wordpress-site.com"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                  />
                </Field>

                <Field>
                  <FieldLabel
                    htmlFor="wordpress-scan-label"
                    className="text-sm text-(--color-text-muted)"
                  >
                    Scan Label (optional)
                  </FieldLabel>
                  <Input
                    id="wordpress-scan-label"
                    type="text"
                    placeholder="e.g. Weekly WP audit"
                    value={scanLabel}
                    onChange={(e) => setScanLabel(e.target.value)}
                  />
                </Field>
              </>
            </FieldGroup>
          )}
          {activeStep === 2 && (
            <>
              <div className="text-xs text-(--color-text-muted) py-4">
                Select Scan Type
              </div>
              <div className="flex items-center justify-center gap-2">
                {newScanModalScanTypes.map((scanType) => (
                  <div
                    key={scanType.id}
                    className={`${scanType.id === selectedScanType ? "border-primary/80 bg-primary/5 hover:border-primary/80 hover:bg-primary/5" : ""} hover:border-popover/90 hover:bg-popover/90 transition-all duration-300 cursor-pointer border border-popover py-12 px-8 bg-popover flex flex-col items-center justify-center text-center`}
                    onClick={() => setSelectedScanType(scanType.id)}
                  >
                    <span className="text-sm font-bold">{scanType.title}</span>
                    <p className="text-xs text-(--color-text-muted)">
                      {scanType.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          {activeStep === 3 && (
            <>
              <div className="text-xs text-(--color-text-muted) py-4">
                Active Modules
              </div>
              <div className="grid grid-cols-2 items-center justify-center gap-2">
                {modalModules.map((module: any) => (
                  <div
                    key={module.id}
                    className={`${module.checked ? "border-primary/80 bg-primary/5 hover:border-primary/80 hover:bg-primary/5" : ""} relative hover:border-popover/90 hover:bg-popover/90 transition-all duration-100 cursor-pointer border border-popover py-3.5 px-10 bg-popover flex flex-col items-start`}
                  >
                    <Checkbox
                      id={module.id}
                      name={module.id}
                      checked={module?.checked}
                      onCheckedChange={(checked) =>
                        handleModuleCheckboxChange(module.id, checked)
                      }
                      className="absolute top-4 left-4 bg-background"
                    />
                    <Label htmlFor={module.id} className="text-sm">
                      {module.title}
                    </Label>
                    <p className="text-xs text-(--color-text-muted)">
                      {module.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          {activeStep === 4 && (
            <div className="space-y-4 py-4">
              <p className="text-xs text-(--color-text-muted)">When To Run</p>
              <div className="flex items-center justify-center gap-2">
                {newScanModalSchedules.map((module: any) => (
                  <div
                    key={module.id}
                    className={`${module.id === selectedSchedule ? "border-primary/80 bg-primary/5 hover:border-primary/80 hover:bg-primary/5" : ""} relative hover:border-popover/90 hover:bg-popover/90 transition-all duration-300 cursor-pointer border border-popover py-3.5 px-10 bg-popover flex flex-col items-center`}
                    onClick={() => setSelectedSchedule(module.id)}
                  >
                    <span className="text-sm font-bold">{module.title}</span>
                    <p className="text-xs text-center text-(--color-text-muted)">
                      {module.description}
                    </p>
                  </div>
                ))}
              </div>

              {selectedSchedule === "schedule" && (
                <FieldGroup className="flex-row">
                  <Field>
                    <FieldLabel
                      htmlFor="date-picker-optional"
                      className="text-sm text-(--color-text-muted) font-normal"
                    >
                      Date
                    </FieldLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger
                        render={
                          <Button
                            variant="outline"
                            id="date-picker-optional"
                            className="justify-between font-normal bg-card"
                          >
                            {date ? format(date, "PPP") : "Select date"}
                            <ChevronDownIcon data-icon="inline-end" />
                          </Button>
                        }
                      />
                      <PopoverContent
                        className="w-auto overflow-hidden p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          defaultMonth={date}
                          onSelect={(date) => {
                            setDate(date);
                            setOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>
                  <Field>
                    <FieldLabel
                      htmlFor="time-picker-optional"
                      className="text-sm text-(--color-text-muted) font-normal"
                    >
                      Time
                    </FieldLabel>
                    <Input
                      type="time"
                      id="time-picker-optional"
                      step="1"
                      defaultValue="10:30:00"
                      value={time}
                      onChange={(event) => setTime(event.target.value)}
                      className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                    />
                  </Field>
                </FieldGroup>
              )}
              {selectedSchedule === "recurring" && (
                <>
                  <p className="text-xs text-(--color-text-muted) mb-2">
                    Frequency
                  </p>
                  <Select
                    items={newScanModalScheduleFrequencies}
                    value={selectedFrequency}
                    onValueChange={setSelectedFrequency}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Choose how often to scan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {newScanModalScheduleFrequencies.map((frequency) => (
                          <SelectItem
                            key={frequency.value}
                            value={frequency.value}
                          >
                            {frequency.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </>
              )}

              <div className="space-y-2">
                <span className="text-xs text-(--color-text-muted)">
                  Alert On Completion
                </span>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="alert-email"
                    name="alert-email"
                    checked={emailAlert}
                    onCheckedChange={(checked) => setEmailAlert(checked)}
                    className="bg-accent-foreground"
                  />
                  <Label
                    htmlFor="alert-email"
                    className="text-sm text-(--color-text-muted)"
                  >
                    Email
                  </Label>
                  <Checkbox
                    id="alert-slack"
                    name="alert-slack"
                    checked={slackAlert}
                    onCheckedChange={(checked) => setSlackAlert(checked)}
                    className="bg-accent-foreground"
                  />
                  <Label
                    htmlFor="alert-slack"
                    className="text-sm text-(--color-text-muted)"
                  >
                    Slack
                  </Label>
                </div>
              </div>
            </div>
          )}

          {activeStep === 5 && (
            <>
              <div className="grid grid-cols-2 border-popover bg-popover p-4 mt-6">
                <span className="font-semibold text-xs text-(--color-text-muted) uppercase">
                  Target
                </span>
                <span className="text-primary">{target}</span>

                <span className="font-semibold text-(--color-text-muted) text-xs uppercase">
                  Scan Label
                </span>
                {scanLabel}

                <span className="font-semibold text-(--color-text-muted) uppercase text-xs">
                  Scan Type
                </span>
                {selectedScanType}

                <span className="font-semibold text-(--color-text-muted) uppercase text-xs">
                  Schedule
                </span>
                {selectedSchedule}

                <span className="font-semibold text-(--color-text-muted) uppercase text-xs">
                  Alerting
                </span>
                {emailAlert && "Email"}
                {emailAlert && slackAlert && " + "}
                {slackAlert && "Slack"}

                <div className="col-span-2">
                  <span className="font-semibold text-(--color-text-muted) uppercase text-xs">
                    Modules
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {modalModules
                      .filter((module: any) => module.checked)
                      .map((module: any) => (
                        <div
                          key={module.id}
                          className="border rounded-xs border-(--brand-secondary)/30 bg-(--brand-secondary)/5 text-(--brand-secondary) text-xs p-1"
                        >
                          {module.title}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="border border-destructive/30 bg-destructive/5 text-destructive rounded-md p-4 mt-6 flex gap-2">
                <OctagonPauseIcon />
                <span className="font-semibold text-(--color-text-muted)">
                  By launching this scan you confirm that you are authorized to
                  scan
                  <span className="font-bold text-accent-foreground">
                    {" "}
                    {target}{" "}
                  </span>
                  and all discovered assets.
                </span>
              </div>
            </>
          )}

          <DialogFooter>
            {activeStep === 1 && (
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] text-(--color-text-muted) uppercase">
                  Step {activeStep} of 5
                </span>
                <Button type="button" onClick={handleNextStep}>
                  Continue
                </Button>
              </div>
            )}
            {showMiddleSteps && (
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] text-(--color-text-muted) uppercase">
                  Step {activeStep} of 5
                </span>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-2 cursor-pointer"
                    onClick={handleBackStep}
                  >
                    <ChevronLeftIcon />
                    Back
                  </Button>
                  <Button
                    type="button"
                    className="cursor-pointer"
                    onClick={handleNextStep}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            {activeStep === 5 && (
              <div className="flex justify-between items-center w-full">
                <span className="text-[10px] text-(--color-text-muted) uppercase">
                  Step {activeStep} of 5
                </span>
                <div className="flex items-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-2"
                    onClick={handleBackStep}
                  >
                    <ChevronLeftIcon />
                    Back
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Launching..." : "Launch Scan"}
                  </Button>
                </div>
              </div>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewScanModal;
