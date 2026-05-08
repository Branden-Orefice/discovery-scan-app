import {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '#/components/ui/dialog'
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "#/components/ui/field"
import {Separator} from "#/components/ui/separator";
import {Input} from "#/components/ui/input"
import {Button} from "#/components/ui/button"

const newScanModalSteps = [
  {
    id: 1,
    step: "01",
    title: "Target"
  },
  {
    id: 2,
    step: "02",
    title: "Scan Type"
  },
  {
    id: 3,
    step: "03",
    title: "Modules"
  },
  {
    id: 4,
    step: "04",
    title: "Schedule"
  },
  {
    id: 5,
    step: "05",
    title: "Review"
  }
]

const NewScanModal = () => {
  const [activeStep, setActiveStep] = useState(1);
  return (
      <Dialog>
        <form>
          <DialogTrigger render={<Button>New Scan</Button>} />
            <DialogContent className="md:max-w-[500px] md:max-h-[550px]">
              <div className="gradient-border-transparent absolute left-0 top-0 h-[2px] w-full" />
                <DialogTitle className="text-lg font-bold">New Scan</DialogTitle>
                  <DialogDescription className="text-sm text-(--color-text-muted)">
                    Configure and launch a new scan.
                  </DialogDescription>
                    <Separator orientation="horizontal" className="h-px mt-4 bg-border -mx-4" />
                      <div className="flex justify-evenly py-4 bg-card -mx-4">
                        {newScanModalSteps.map((step) => (
                          <div key={step.id} className="">
                            {activeStep === step.id ? (
                              <>
                                <span className="border rounded-4xl border-primary/50 px-1.5 py-1 bg-primary/10 text-primary text-xs">{step.step}</span>
                                <span className="text-xs ml-2">{step.title}</span>
                              </>
                            ) : (
                              <>
                                <span className="border rounded-4xl border-border bg-muted px-1.5 py-1 text-(--color-text-muted) text-xs">{step.step}</span>
                                <span className="text-xs ml-2 text-(--color-text-muted)">{step.title}</span>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    <Separator orientation="horizontal" className="h-px bg-border -mx-4" />
                    <FieldGroup>

              <Field className="mt-4">
                <FieldLabel htmlFor="wordpress-url" className="text-sm text-(--color-text-muted)">WordPress Site Url</FieldLabel>
                <Input id="wordpress-url" type="text" required placeholder="https://wordpress-site.com" />
              </Field>

              <Field>
                <FieldLabel htmlFor="wordpress-scan-label" className="text-sm text-(--color-text-muted)">Scan Label (optional)</FieldLabel>
                <Input id="wordpress-scan-label" type="text" placeholder="e.g. Weekly WP audit"/>
              </Field>
              </FieldGroup>
              <DialogFooter>
                <div className="flex justify-between items-center w-full">
                <span className="text-[10px] text-(--color-text-muted) uppercase">Step {activeStep} of 5</span>
                <Button type="submit">Continue</Button>
                </div>
              </DialogFooter>
            </DialogContent>
        </form>
      </Dialog>
  )
}

export default NewScanModal
