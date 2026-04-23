import React from "react";
import {BoxIcon, BuildingIcon, EarthIcon, LockIcon, MailIcon, Search, ShieldIcon, UserIcon} from "lucide-react";
import {FieldGroup, Field, FieldLabel} from "@/components/ui/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group.tsx";
import {SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, Select} from "@/components/ui/select.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "#/components/ui/button.tsx";

const contactInfo = [
  {
    id: 1,
    icon: <MailIcon size={16} />,
    title: "Email",
    contact: "hello@atlasrecon.io",
    description: "General Inquiries"
  },
  {
    id: 2,
    icon: <ShieldIcon size={16} />,
    title: "Security",
    contact: "security@atlasrecon.io",
    description: "Responsible Disclosure"
  },
  {
    id: 3,
    icon: <BoxIcon size={16} />,
    title: "Enterprise",
    contact: "sales@atlasrecon.io",
    description: "Custom Plans & Procurement"
  },
  {
    id: 4,
    icon: <EarthIcon size={16} />,
    title: "HQ",
    contact: "Miami, FL",
    description: "Remote-First Team"
  }
]

const Contact = () => {
  return (
    <div className="md:mt-20 mt-30">
      <section className="container mx-auto md:flex justify-evenly md:gap-x-8">
        <div className="space-y-4 mt-20">
          <span className="text-primary uppercase px-3 md:px-0 text-[10px] tracking-wide flex items-center gap-2">
            <span className="w-6 h-px bg-primary" />
            Contact
          </span>

          <h2 className="md:text-3xl text-2xl md:px-0 px-3 font-bold md:w-[12ch] w-[11ch] ">
            Get in <span className="text-primary">touch</span> with our team
          </h2>
          <p className="text-(--color-text-muted) md:px-0 px-3 md:text-md text-sm md:w-[50ch] w-[30ch]">
            Whether you're evaluating Atlas Recon, have a security question, or need enterprise support, we respond fast.
          </p>


          <div className="flex flex-col md:w-100 mt-10 md:px-0 px-3 gap-1">
            {contactInfo.map((info) => (
              <div key={info.id}>
                <div className="flex items-center border border-(--color-border-subtle) px-8 py-4">
                  <div className="text-primary border border-(--color-border-subtle) mr-3 mb-3 p-2 bg-secondary">{info.icon}</div>
                  <div>
                    <h3 className="text-[10px] uppercase tracking-wide text-(--color-text-muted)">{info.title}</h3>
                    <p className="text-sm font-bold">{info.contact}</p>
                    <p className="text-xs text-(--color-text-muted)">{info.description}</p>
                 </div>
               </div>
              </div>
            ))}
          </div>
          <div className="md:px-0 px-3">
          <span className="inline-flex mt-3 items-center gap-2 border border-(--brand-secondary)/40 px-2 py-1 bg-(--brand-secondary)/10 rounded tracking-wide font-semibold text-sm text-(--brand-secondary) animate-pulse">
            Typical response under 2 hours</span>
          </div>
        </div>


        <div className="relative flex flex-col md:w-100 md:mx-0 mx-3 mt-20 gap-1 border border-(--color-border-subtle)">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[var(--brand-secondary)] via-[var(--primary)] to-transparent" />
            <div className="px-8 py-6">
              <h3 className="font-bold">Send a message</h3>
              <p className="text-sm text-(--color-text-muted)">We'll get back to you shortly.</p>
            </div>
          <div className="border-b border-(--color-border-subtle) w-full" />
          <form>
            <FieldGroup className="mt-8 grid grid-cols-2 px-6">
              <Field>
                <FieldLabel className="text-xs text-(--color-text-muted)" htmlFor="input-group-first-name">First Name</FieldLabel>
                <InputGroup className="bg-secondary">
                  <InputGroupInput className="text-sm md:text-md" id="input-group-first-name" placeholder="Alex" />
                  <InputGroupAddon align="inline-start">
                    <UserIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel className="text-xs text-(--color-text-muted)" htmlFor="input-group-last-name">Last Name</FieldLabel>
                <InputGroup className="bg-secondary">
                  <InputGroupInput className="text-sm md:text-md" id="input-group-last-name" placeholder="Lee" />
                  <InputGroupAddon align="inline-start">
                    <UserIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
            <FieldGroup className="mt-8 flex flex-col px-6">
              <Field>
                <FieldLabel className="text-xs text-(--color-text-muted)" htmlFor="input-group-email">Work Email</FieldLabel>
                <InputGroup className="bg-secondary">
                  <InputGroupInput className="text-sm md:text-md" id="input-group-email" placeholder="you@company.com" />
                  <InputGroupAddon align="inline-start">
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel className="text-xs text-(--color-text-muted)" htmlFor="input-group-company">Company</FieldLabel>
                <InputGroup className="bg-secondary">
                  <InputGroupInput className="text-sm md:text-md" id="input-group-company" placeholder="Company Name" />
                  <InputGroupAddon align="inline-start">
                    <BuildingIcon />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel className="text-xs text-(--color-text-muted)">Topic</FieldLabel>
                <Select>
                  <SelectTrigger className='text-sm md:text-md bg-secondary '>
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="free scan question">Free Scan Question</SelectItem>
                      <SelectItem value="enterprise pricing">Enterprise Pricing</SelectItem>
                      <SelectItem value="technical support">Technical Support</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="security disclosure">Security Disclosure</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel className="relative text-xs text-(--color-text-muted)">Message</FieldLabel>
                <Textarea className="text-sm md:text-md bg-secondary " placeholder="Tell us what you're working on..." />
              </Field>
            </FieldGroup>
            <div className="mb-4 flex items-center justify-between px-6 py-4">
              <span className="text-xs text-(--color-text-muted) flex items-center gap-2 mt-4"><LockIcon size={12} /> We never share your data.</span>
              <Button className="mt-4 hover:-translate-y-0.5 cursor-pointer transition-all duration-300 hover:shadow-[0_4px_16px_rgba(249,115,22,0.7)]" type="submit"> Send Message</Button>
            </div>
          </form>
        </div>

      </section>
    </div>
  );
}

export default Contact;